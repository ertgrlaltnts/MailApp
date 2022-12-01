import React, { useState } from "react";
import { Inb } from "./style";
import { ArrowClockwise, Trash, Star, Export } from "phosphor-react";
import { Tooltip, Popconfirm } from "antd";
import { Tray, EnvelopeSimple, WarningCircle } from "phosphor-react";
import "../../App.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  clearTrash,
  mailToStar,
  mailToTrash,
  readMessage,
  starsToMail,
  starsToTrash,
  trashToMail,
} from "../../store/reducers/User";
import errorNotification from "../../helper/errorNotification";
import successNotification from "../../helper/successNotification";
import EmptyMessage from "../Emptys/EmptyMessage";

const Inbox = ({
  data,
  setMessageIndex,
  setTab,
  setReply,
  tab,
  checkList,
  setCheckList,
  search,
  beforeTab,
}) => {
  const [middleActiveTab, setMiddleActiveTab] = useState(1);
  let list = data;
  let unRead = [];
  const { user, messages, stars, trash } = useSelector((state) => state.User);
  const dispatch = useDispatch((state) => state.User);

  const filterData = () => {
    let temp = list.filter(
      ({ title }) => title.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
    list = temp;

    let a = data.filter(
      (item) =>
        item.messages[item.messages.length - 1].receiver === user.email &&
        item.messages[item.messages.length - 1].isRead === false
    );
    unRead = a;
  };

  filterData();

  const handleCheck = (event) => {
    var updatedList = [...checkList];
    if (event.target.checked) {
      updatedList = [...checkList, event.target.value];
    } else {
      updatedList.splice(checkList.indexOf(event.target.value), 1);
    }
    setCheckList(updatedList);
  };

  const handleMessage = async (item) => {
    const readObj = {
      receiverEmail: user.email,
      mailID: item._id,
    };
    await axios.put(`http://${process.env.REACT_APP_IP}/mail/read`, readObj);
    dispatch(readMessage({ _id: item._id, tab: tab }));

    const index =
      beforeTab === 1
        ? messages.findIndex((element) => element._id === item._id)
        : beforeTab === 2
        ? stars.findIndex((element) => element._id === item._id)
        : trash.findIndex((element) => element._id === item._id);

    setMessageIndex(index);

    const obj = {
      senderEmail:
        beforeTab === 1
          ? messages[index].senderEmail
          : beforeTab === 2
          ? stars[index].senderEmail
          : trash[index].senderEmail,
      receiverEmail:
        beforeTab === 1
          ? messages[index].receiverEmail
          : beforeTab === 2
          ? stars[index].receiverEmail
          : trash[index].receiverEmail,
      mailID:
        beforeTab === 1
          ? messages[index]._id
          : beforeTab === 2
          ? stars[index]._id
          : trash[index]._id,
      title:
        beforeTab === 1
          ? messages[index].title
          : beforeTab === 2
          ? stars[index].title
          : trash[index].title,
    };
    setReply({ ...obj });
    setTab(5);
  };

  const moveMessages = async (value, reducer) => {
    if (checkList.length) {
      const req = await axios.post(
        `http://${process.env.REACT_APP_IP}/user/${value}`,
        {
          _id: user._id,
          mailList: [...checkList],
        }
      );
      if (req.data.res === 2) {
        errorNotification("Bir hata oluştu");
      } else {
        dispatch(reducer([...checkList]));
        setCheckList([]);
        successNotification("Mesajlar başarıyla aktarıldı");
      }
    } else {
      errorNotification("Seçilmiş mesaj bulunamadı");
    }
  };

  return (
    <Inb.Container>
      <Inb.Top>
        <Inb.TopRowItem>
          <Tooltip
            title="Yenile"
            placement="bottom"
            onClick={() => window.location.reload()}
          >
            <Inb.TopItem>
              <ArrowClockwise size={20} />
            </Inb.TopItem>
          </Tooltip>
          <Tooltip
            title={tab === 1 || tab === 2 ? "Kutuya taşı" : "Sil"}
            placement="bottom"
          >
            {tab === 3 ? (
              checkList.length ? (
                <Popconfirm
                  title={`${checkList.length} postayı silmek istediğinize emin misiniz ?`}
                  onConfirm={() =>
                    tab === 1
                      ? moveMessages("trash", mailToTrash)
                      : tab === 2
                      ? moveMessages("stars/trash", starsToTrash)
                      : moveMessages("trash/clear", clearTrash)
                  }
                  onCancel={() => console.log("olmadı")}
                  okText="Evet"
                  cancelText="Hayır"
                >
                  <Inb.TopItem>
                    <Trash size={20} />
                  </Inb.TopItem>
                </Popconfirm>
              ) : (
                <Inb.TopItem
                  onClick={() => errorNotification("Seçili mesaj bulunamadı")}
                >
                  <Trash size={20} />
                </Inb.TopItem>
              )
            ) : (
              <Inb.TopItem
                onClick={() =>
                  tab === 1
                    ? moveMessages("trash", mailToTrash)
                    : tab === 2
                    ? moveMessages("stars/trash", starsToTrash)
                    : moveMessages("trash/clear", clearTrash)
                }
              >
                <Trash size={20} />
              </Inb.TopItem>
            )}
          </Tooltip>
          {tab === 1 || tab === 2 ? (
            <Tooltip
              title={tab === 1 ? "Yıldızla" : "Çıkar"}
              placement="bottom"
              onClick={() =>
                tab === 1
                  ? moveMessages("stars", mailToStar)
                  : moveMessages("stars/remove", starsToMail)
              }
            >
              <Inb.TopItem>
                <Star size={20} />
              </Inb.TopItem>
            </Tooltip>
          ) : (
            ""
          )}
          {tab === 3 && (
            <Tooltip
              title="Çıkart"
              placement="bottom"
              onClick={() => moveMessages("trash/remove", trashToMail)}
            >
              <Inb.TopItem>
                <Export size={20} />
              </Inb.TopItem>
            </Tooltip>
          )}
        </Inb.TopRowItem>
        <Inb.TopRowItem>
          {checkList.length ? (
            <Inb.BoldText>Seçili : {checkList.length}</Inb.BoldText>
          ) : (
            " "
          )}
        </Inb.TopRowItem>
      </Inb.Top>
      <Inb.Middle>
        <Inb.MiddleItem
          onClick={() => setMiddleActiveTab(1)}
          isActive={middleActiveTab === 1 ? true : false}
        >
          <Tray
            size={20}
            className={middleActiveTab === 1 ? "active" : "disable"}
          />
          <>Tüm Postalar</>
          {unRead.length > 0 ? (
            <Inb.Warning abs={false}>
              <WarningCircle weight="fill" />
            </Inb.Warning>
          ) : (
            ""
          )}
        </Inb.MiddleItem>
        <Inb.MiddleItem
          onClick={() => setMiddleActiveTab(2)}
          isActive={middleActiveTab === 2 ? true : false}
        >
          <EnvelopeSimple
            size={20}
            className={middleActiveTab === 2 ? "active" : "disable"}
          />
          <>Okunmamışlar</>
          {unRead.length > 0 ? (
            <Inb.Warning abs={false}>
              <WarningCircle weight="fill" />
            </Inb.Warning>
          ) : (
            ""
          )}
        </Inb.MiddleItem>
      </Inb.Middle>
      <Inb.Boxes>
        {middleActiveTab === 1 ? (
          list.length ? (
            list
              .slice(0)
              .reverse()
              .map((item) => (
                <>
                  <Inb.Box>
                    <Inb.CheckBoxItem>
                      <Inb.CheckBox
                        type="checkbox"
                        value={item._id}
                        onChange={handleCheck}
                        checked={
                          checkList.indexOf(item._id) !== -1 ? true : false
                        }
                      />
                    </Inb.CheckBoxItem>
                    <Inb.Item onClick={() => handleMessage(item)}>
                      {item.senderEmail === user.email
                        ? item.receiverEmail
                        : item.senderEmail}
                    </Inb.Item>
                    <Inb.LongItem onClick={() => handleMessage(item)}>
                      {item.title}
                    </Inb.LongItem>
                    <Inb.LongItemText onClick={() => handleMessage(item)}>
                      {item.messages[item.messages.length - 1].message}
                    </Inb.LongItemText>
                    {item.messages.findIndex(
                      (element) =>
                        element.receiver === user.email &&
                        element.isRead === false
                    ) !== -1 && (
                      <Inb.Warning abs={true}>
                        <WarningCircle weight="fill" />
                      </Inb.Warning>
                    )}
                  </Inb.Box>
                </>
              ))
          ) : (
            <EmptyMessage
              text={
                tab === 1
                  ? "Gelen kutunuzda mesaj bulunmamaktadır."
                  : tab === 2
                  ? "Yıldızlılar arasında mesaj bulunmamaktadır."
                  : "Çöp kutunuzda mesaj bulunmamaktadır."
              }
            />
          )
        ) : unRead.length ? (
          unRead.map((item) => (
            <>
              <Inb.Box>
                <Inb.CheckBoxItem>
                  <Inb.CheckBox
                    type="checkbox"
                    value={item._id}
                    onChange={handleCheck}
                    checked={checkList.indexOf(item._id) !== -1 ? true : false}
                  />
                </Inb.CheckBoxItem>
                <Inb.Item onClick={() => handleMessage(item)}>
                  {item.senderEmail === user.email
                    ? item.receiverEmail
                    : item.senderEmail}
                </Inb.Item>
                <Inb.LongItem onClick={() => handleMessage(item)}>
                  {item.title}
                </Inb.LongItem>
                <Inb.LongItemText onClick={() => handleMessage(item)}>
                  {item.messages[item.messages.length - 1].message}
                </Inb.LongItemText>
                {item.messages.findIndex(
                  (element) =>
                    element.receiver === user.email && element.isRead === false
                ) !== -1 && (
                  <Inb.Warning abs={true}>
                    <WarningCircle weight="fill" />
                  </Inb.Warning>
                )}
              </Inb.Box>
            </>
          ))
        ) : (
          <EmptyMessage
            text={
              tab === 1
                ? "Gelen kutunuzda okunmamış mesaj bulunmamaktadır."
                : tab === 2
                ? "Yıldızlılar arasında okunmamış mesaj bulunmamaktadır."
                : "Çöp kutunuzda okunmamış mesaj bulunmamaktadır."
            }
          />
        )}
      </Inb.Boxes>
    </Inb.Container>
  );
};

export default Inbox;
