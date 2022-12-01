import React, { useState } from "react";
import { Hmp } from "./style";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import Inbox from "../../components/Inbox/Inbox";
import Detail from "../../components/Detail/Detail";
import Header from "../../components/Header/Header";
import SendMail from "../../components/SendMail/SendMail";
import SendReply from "../../components/SendReply/SendReply";
import MobileMenu from "../../components/MobileMenu/MobileMenu";

const Home = () => {
  const [replyVisible, setReplyVisible] = useState(false);
  const [reply, setReply] = useState({});
  const [messageIndex, setMessageIndex] = useState("");
  const [smallHeader, setSmallHeader] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [tab, setTab] = useState(1);
  const [beforeTab, setBeforeTab] = useState(1);
  const [checkList, setCheckList] = useState([]);
  const [search, setSearch] = useState("");
  const { messages, stars, trash } = useSelector((state) => state.User);

  return (
    <AnimatedPage>
      <Hmp.Container>
        <Header
          smallHeader={smallHeader}
          setSmallHeader={setSmallHeader}
          setSearch={setSearch}
        />
        <Row>
          <Col xl={5} lg={24} md={24} sm={24} xs={24}>
            <LeftNavigation
              setDrawerVisible={setDrawerVisible}
              tab={tab}
              setTab={setTab}
              setBeforeTab={setBeforeTab}
              setCheckList={setCheckList}
            />
            <MobileMenu
              smallHeader={smallHeader}
              setSmallHeader={setSmallHeader}
              setDrawerVisible={setDrawerVisible}
              tab={tab}
              setTab={setTab}
              setBeforeTab={setBeforeTab}
              setCheckList={setCheckList}
            />
          </Col>
          <Col xl={19} lg={24} md={24} sm={24} xs={24}>
            {tab === 5 ? (
              <Detail
                setVisible={setReplyVisible}
                setTab={setTab}
                messageIndex={messageIndex === -1 ? 0 : messageIndex}
                beforeTab={beforeTab}
              />
            ) : (
              <Inbox
                data={tab === 1 ? messages : tab === 2 ? stars : trash}
                setMessageIndex={setMessageIndex}
                setTab={setTab}
                setReply={setReply}
                tab={tab}
                checkList={checkList}
                setCheckList={setCheckList}
                search={search}
                beforeTab={beforeTab}
              />
            )}
          </Col>
        </Row>
        <SendMail visible={drawerVisible} setVisible={setDrawerVisible} />

        <SendReply
          visible={replyVisible}
          setVisible={setReplyVisible}
          data={reply}
          beforeTab={beforeTab}
        />
      </Hmp.Container>
    </AnimatedPage>
  );
};

export default Home;
