import React, { useState } from "react";
import { Drawer } from "antd";
import { Sdm } from "./style";
import { PaperPlaneTilt } from "phosphor-react";
import { useSelector } from "react-redux";
import errorNotification from "../../helper/errorNotification";
import axios from "axios";

const SendMail = ({ visible, setVisible }) => {
  const [receiver, setReceiver] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const { user } = useSelector((state) => state.User);

  const onClose = () => {
    setVisible(false);
    setReceiver("");
    setTitle("");
    setMessage("");
  };

  const handleClick = async () => {
    const obj = {
      senderEmail: user.email,
      receiverEmail: receiver,
      title: title,
      message: message,
    };

    const createMessage = await axios.post(
      `http://${process.env.REACT_APP_IP}/mail/send`,
      obj
    );
    if (createMessage.data.res === 3) {
      errorNotification("Kullanıcı bulunamadı");
    } else if (createMessage.data.res === 3) {
      errorNotification("Bir hata oluştu");
    } else {
      window.location.reload();
    }
  };

  return (
    <Drawer
      title="Yeni İleti"
      placement="right"
      onClose={onClose}
      open={visible}
      width={window.innerWidth > 768 ? 400 : window.innerWidth - 100}
      style={{ fontFamily: "QuickSandRegular" }}
    >
      <Sdm.Container>
        <Sdm.InputBox>
          <Sdm.InputTitle>Kime </Sdm.InputTitle>
          <Sdm.Input onChange={(e) => setReceiver(e.target.value)} />
        </Sdm.InputBox>
        <Sdm.InputBox>
          <Sdm.InputTitle>Konu </Sdm.InputTitle>
          <Sdm.Input onChange={(e) => setTitle(e.target.value)} />
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

export default SendMail;
