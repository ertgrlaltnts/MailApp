import React, { useState } from "react";
import { Drawer } from "antd";
import { Sdm } from "./style";
import { PaperPlaneTilt } from "phosphor-react";
import errorNotification from "../../helper/errorNotification";
import successNotification from "../../helper/successNotification";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { pushMessage } from "../../store/reducers/User";
import moment from "moment";

const SendReply = ({ visible, setVisible, data, beforeTab }) => {
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.User);
  const dispatch = useDispatch((state) => state.User);
  const obj = {
    senderEmail:
      data.senderEmail === user.email ? data.senderEmail : data.receiverEmail,
    receiverEmail:
      data.receiverEmail === user.email ? data.senderEmail : data.receiverEmail,
    message: message,
    mailID: data.mailID,
  };

  const onClose = () => {
    setVisible(false);
    setMessage("");
  };

  const handleClick = async () => {
    const replyMessage = await axios.post(
      `http://${process.env.REACT_APP_IP}/mail/reply`,
      obj
    );
    if (replyMessage.data.res === 2) {
      errorNotification("Bir hata oluştu");
    } else {
      const tempObj = {
        mailID: data.mailID,
        sender:
          data.senderEmail === user.email
            ? data.senderEmail
            : data.receiverEmail,
        receiver:
          data.receiverEmail === user.email
            ? data.senderEmail
            : data.receiverEmail,
        isRead: false,
        date: moment().format("LLL"),
        message: message,
        _id: Math.floor(Math.random() * 1235689324329000),
      };
      setVisible(false);
      dispatch(pushMessage({ ...tempObj, tab: beforeTab }));
      successNotification("Yanıt başarıyla gönderildi");
    }
  };

  return (
    <Drawer
      title="Yeni Yanıt"
      placement="right"
      onClose={onClose}
      open={visible}
      width={window.innerWidth > 768 ? 400 : window.innerWidth - 100}
      style={{ fontFamily: "QuickSandRegular" }}
    >
      <Sdm.Container>
        <Sdm.InputBox>
          <Sdm.InputTitle>Kime </Sdm.InputTitle>
          <Sdm.InputText>{obj.receiverEmail}</Sdm.InputText>
        </Sdm.InputBox>
        <Sdm.InputBox>
          <Sdm.InputTitle>Konu </Sdm.InputTitle>
          <Sdm.InputText>{data.title} </Sdm.InputText>
        </Sdm.InputBox>
        <Sdm.Message>
          <Sdm.MessageInput
            placeholder="İletiniz"
            onChange={(e) => setMessage(e.target.value)}
          />
        </Sdm.Message>
      </Sdm.Container>
      <Sdm.SendButton onClick={handleClick}>
        <PaperPlaneTilt size={25} style={{ marginRight: 5 }} />
        <>Gönder</>
      </Sdm.SendButton>
    </Drawer>
  );
};

export default SendReply;
