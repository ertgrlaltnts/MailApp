import React from "react";
import { Hdr } from "./style";
import { Row, Col, Tooltip, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import successNotification from "../../helper/successNotification";
import Logo from "../../assets/logo.png";
import { logOutUser } from "../../store/reducers/User";
import { MagnifyingGlass, Gear, Info, UserCircle, List } from "phosphor-react";

const Header = ({ setSmallHeader, setSearch }) => {
  const { user } = useSelector((state) => state.User);
  const dispatch = useDispatch((state) => state.User);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logOutUser());
    navigate("/login");
    successNotification("Başarıyla çıkış yapıldı");
  };

  const content = (
    <Hdr.UserContainer>
      <Hdr.Avatar>
        {user.name.charAt(0)}
        {user.lastName.charAt(0)}
      </Hdr.Avatar>
      <Hdr.Name>
        {user.name} {user.lastName}
      </Hdr.Name>
      <Hdr.ExitButton onClick={handleLogout}>Çıkış Yap</Hdr.ExitButton>
    </Hdr.UserContainer>
  );
  return (
    <Hdr.Container>
      <Row>
        <Col span={5}>
          <Hdr.Item
            onClick={() => {
              window.innerWidth < 769 && setSmallHeader(true);
            }}
          >
            <Hdr.Logo src={Logo} />
            <Hdr.Hamburger>
              <List size={45} />
            </Hdr.Hamburger>
          </Hdr.Item>
        </Col>
        <Col xl={13} lg={13} md={19} sm={19} xs={19}>
          <Hdr.MidItem>
            <Hdr.Input
              placeholder="Postalarda arayın"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Hdr.SearchButton>
              <MagnifyingGlass size={24} color={"#5f6368"} />
            </Hdr.SearchButton>
          </Hdr.MidItem>
        </Col>

        <Col span={6}>
          <Hdr.Row>
            <Tooltip title="Destek" placement="bottom">
              <Hdr.RowItem>
                <Info size={24} color={"#5f6368"} />
              </Hdr.RowItem>
            </Tooltip>
            <Tooltip title="Ayarlar" placement="bottom">
              <Hdr.RowItem>
                <Gear size={24} color={"#5f6368"} />
              </Hdr.RowItem>
            </Tooltip>
            <Popover content={content} trigger="click">
              <Hdr.RowItem>
                <UserCircle size={24} color={"#5f6368"} />
              </Hdr.RowItem>
            </Popover>
          </Hdr.Row>
        </Col>
      </Row>
    </Hdr.Container>
  );
};

export default Header;
