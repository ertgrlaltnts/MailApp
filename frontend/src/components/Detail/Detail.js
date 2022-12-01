import React from "react";
import { Dtl } from "./style";
import { ArrowLeft, PaperPlaneTilt } from "phosphor-react";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import User from "../../assets/user.png";

const Detail = ({ messageIndex, setVisible, setTab, beforeTab }) => {
  const { user, messages, stars, trash } = useSelector((state) => state.User);

  const handleReply = () => {
    setVisible(true);
  };

  return (
    <Dtl.Container>
      <Dtl.Top>
        <Tooltip
          title="Geri"
          placement="bottom"
          onClick={() => setTab(beforeTab)}
        >
          <Dtl.TopItem>
            <ArrowLeft size={20} />
          </Dtl.TopItem>
        </Tooltip>
        <Tooltip title="Yanıtla" placement="bottom" onClick={handleReply}>
          <Dtl.TopItem>
            <PaperPlaneTilt size={20} />
          </Dtl.TopItem>
        </Tooltip>
      </Dtl.Top>
      <Dtl.Messages>
        {beforeTab === 1
          ? messages[messageIndex].messages.map((item) => (
              <Dtl.Message isSender={item.sender === user.email ? true : false}>
                <Dtl.Image src={User} />
                <Dtl.TextContainer
                  isSender={item.sender === user.email ? true : false}
                >
                  <Dtl.TextTitle>
                    {item.sender === user.email ? "Ben" : item.sender}
                  </Dtl.TextTitle>
                  <Dtl.Text>{item.message}</Dtl.Text>
                  <Dtl.Date>Gönderim tarihi : {item.date}</Dtl.Date>
                </Dtl.TextContainer>
              </Dtl.Message>
            ))
          : beforeTab === 2
          ? stars[messageIndex].messages.map((item) => (
              <Dtl.Message isSender={item.sender === user.email ? true : false}>
                <Dtl.Image src={User} />
                <Dtl.TextContainer
                  isSender={item.sender === user.email ? true : false}
                >
                  <Dtl.TextTitle>
                    {item.sender === user.email ? "Ben" : item.sender}
                  </Dtl.TextTitle>
                  <Dtl.Text>{item.message}</Dtl.Text>
                  <Dtl.Date>Gönderim tarihi : {item.date}</Dtl.Date>
                </Dtl.TextContainer>
              </Dtl.Message>
            ))
          : trash[messageIndex].messages.map((item) => (
              <Dtl.Message isSender={item.sender === user.email ? true : false}>
                <Dtl.Image src={User} />
                <Dtl.TextContainer
                  isSender={item.sender === user.email ? true : false}
                >
                  <Dtl.TextTitle>
                    {item.sender === user.email ? "Ben" : item.sender}
                  </Dtl.TextTitle>
                  <Dtl.Text>{item.message}</Dtl.Text>
                  <Dtl.Date>Gönderim tarihi : {item.date}</Dtl.Date>
                </Dtl.TextContainer>
              </Dtl.Message>
            ))}
      </Dtl.Messages>
    </Dtl.Container>
  );
};

export default Detail;
