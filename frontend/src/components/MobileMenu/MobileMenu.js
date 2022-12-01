import React from "react";
import { Mbm } from "./style";
import { Drawer } from "antd";
import { Pen, Tray, Star, Trash, Gear, Info, SignOut } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import successNotification from "../../helper/successNotification";
import { logOutUser } from "../../store/reducers/User";
import Logo from "../../assets/logo.png";
import "./style.css";

const MobileMenu = ({
  setDrawerVisible,
  tab,
  setTab,
  smallHeader,
  setSmallHeader,
  setBeforeTab,
}) => {
  const dispatch = useDispatch((state) => state.User);
  const { messages, stars, trash } = useSelector((state) => state.User);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logOutUser());
    navigate("/login");
    successNotification("Başarıyla çıkış yapıldı");
  };

  const onClose = () => {
    setSmallHeader(false);
  };

  const handleElement = (value) => {
    setTab(value);
    setBeforeTab(value);
    setSmallHeader(false);
  };

  const handleCreate = () => {
    setSmallHeader(false);
    setDrawerVisible(true);
  };
  return (
    <Drawer
      placement="left"
      onClose={onClose}
      open={smallHeader}
      width={300}
      style={{ fontFamily: "QuickSandRegular", padding: 0 }}
    >
      <Mbm.Container>
        <Mbm.Logo src={Logo} />
        <Mbm.Create onClick={handleCreate}>
          <Pen style={{ marginRight: 5 }} size={25} />
          <>Oluştur</>
        </Mbm.Create>
        <Mbm.TabContainer>
          <Mbm.Tab
            tab={tab === 1 ? true : false}
            onClick={() => handleElement(1)}
          >
            <Tray size={20} />
            <Mbm.TabText>Gelen Kutusu</Mbm.TabText>
            <Mbm.TabText>{messages.length}</Mbm.TabText>
          </Mbm.Tab>
          <Mbm.Tab
            tab={tab === 2 ? true : false}
            onClick={() => handleElement(2)}
          >
            <Star size={20} />
            <Mbm.TabText>Yıldızlı</Mbm.TabText>
            <Mbm.TabText>{stars.length}</Mbm.TabText>
          </Mbm.Tab>

          <Mbm.Tab
            tab={tab === 3 ? true : false}
            onClick={() => handleElement(3)}
          >
            <Trash size={20} />
            <Mbm.TabText>Çöp Kutusu</Mbm.TabText>
            <Mbm.TabText>{trash.length}</Mbm.TabText>
          </Mbm.Tab>

          <Mbm.Tab style={{ marginTop: 80 }}>
            <Gear size={20} />
            <Mbm.TabText>Ayarlar</Mbm.TabText>
            <Mbm.TabText> </Mbm.TabText>
          </Mbm.Tab>

          <Mbm.Tab>
            <Info size={20} />
            <Mbm.TabText>Yardım</Mbm.TabText>
            <Mbm.TabText> </Mbm.TabText>
          </Mbm.Tab>

          <Mbm.Tab onClick={handleLogout}>
            <SignOut size={20} />
            <Mbm.TabText>Çıkış Yap</Mbm.TabText>
            <Mbm.TabText> </Mbm.TabText>
          </Mbm.Tab>
        </Mbm.TabContainer>
      </Mbm.Container>
    </Drawer>
  );
};

export default MobileMenu;
