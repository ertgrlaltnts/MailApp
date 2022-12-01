import React, { useState } from "react";
import { Rgs } from "./style";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import { ArrowLeft } from "phosphor-react";
import errorNotification from "../../helper/errorNotification";
import successNotification from "../../helper/successNotification";
import validateEmail from "../../helper/validateEmail";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/reducers/User";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const dispatch = useDispatch((state) => state.User);

  const handleRegister = async () => {
    if (!email || !password || !name || !lastName || !passwordAgain) {
      errorNotification("Alanlar boş bırakılamaz");
    } else if (!validateEmail(email)) {
      errorNotification("Geçersiz email adresi");
    } else if (password !== passwordAgain) {
      errorNotification("Şifreler uyuşmuyor");
    } else if (password.length < 8 || passwordAgain.length < 8) {
      errorNotification("Şifre en az 8 karakterli olmalı");
    } else {
      const registerObj = {
        name,
        lastName,
        email,
        password,
        passwordAgain,
      };
      const obj = {
        email,
        password,
      };

      const register = await axios.post(
        `http://${process.env.REACT_APP_IP}/user/create`,
        registerObj
      );

      if (register.data.res === 2) {
        errorNotification("E-mail kullanımda");
      } else if (register.data.res === 2) {
        errorNotification("Bilinmeyen bir hata oluştu");
      } else {
        const user = await axios.post(
          `http://${process.env.REACT_APP_IP}/user/login`,
          obj
        );
        if (user.data.res === 4) {
          errorNotification("Bilinmeyen bir hata oluştu");
        } else if (user.data.res !== 1) {
          errorNotification("E-mail veya şifre hatalı");
        } else {
          localStorage.setItem("token", user.data.token);
          const currentUser = await axios.get(
            `http://${process.env.REACT_APP_IP}/user/${user.data.token}`
          );
          const messagesData = await axios.get(
            `http://${process.env.REACT_APP_IP}/mail/open/${currentUser.data.user._id}`
          );

          dispatch(
            loginUser({
              user: currentUser.data.user,
              messages: messagesData.data.messagesData,
              stars: messagesData.data.starsData,
              trash: messagesData.data.trashData,
            })
          );
          successNotification(`Hoşgeldin ${currentUser.data.user.name}`);
        }
      }
    }
  };

  const navigate = useNavigate();

  return (
    <AnimatedPage>
      <Rgs.Container>
        <Rgs.Box>
          <Rgs.Logo src={Logo} />
          <Rgs.Title>Hesap Oluştur</Rgs.Title>
          <Rgs.InputRow>
            <Rgs.InputBox>
              <Rgs.InputTitle>Ad : </Rgs.InputTitle>
              <Rgs.Input
                placeholder="Adınız"
                onChange={(e) => setName(e.target.value)}
              />
            </Rgs.InputBox>
            <Rgs.InputBox>
              <Rgs.InputTitle>Soyad : </Rgs.InputTitle>
              <Rgs.Input
                placeholder="Soyadınız"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Rgs.InputBox>
          </Rgs.InputRow>
          <Rgs.InputBox>
            <Rgs.InputTitle>E-mail : </Rgs.InputTitle>
            <Rgs.BigInput
              placeholder="E-mail adresiniz"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Rgs.InputBox>
          <Rgs.InputRow>
            <Rgs.InputBox>
              <Rgs.InputTitle>Şifre : </Rgs.InputTitle>
              <Rgs.Input
                type="password"
                placeholder="Şifreniz"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Rgs.InputBox>
            <Rgs.InputBox>
              <Rgs.InputTitle>Şifre {`(Tekrar)`} : </Rgs.InputTitle>
              <Rgs.Input
                type="password"
                placeholder="Şifreniz (Tekrar)"
                onChange={(e) => setPasswordAgain(e.target.value)}
              />
            </Rgs.InputBox>
          </Rgs.InputRow>
          <Rgs.Button onClick={handleRegister}>Kayıt ol</Rgs.Button>
          <Rgs.Back onClick={() => navigate("/login")}>
            <Tooltip title="Giriş yap" placement="bottom">
              <ArrowLeft size={40} />
            </Tooltip>
          </Rgs.Back>
        </Rgs.Box>
      </Rgs.Container>
    </AnimatedPage>
  );
};

export default Register;
