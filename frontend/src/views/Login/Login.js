import React, { useState } from "react";
import { Lgn } from "./style";
import Logo from "../../assets/logo.png";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import errorNotification from "../../helper/errorNotification";
import successNotification from "../../helper/successNotification";
import validateEmail from "../../helper/validateEmail";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/reducers/User";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch((state) => state.User);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      errorNotification("Alanlar boş bırakılamaz");
    } else if (!validateEmail(email)) {
      errorNotification("Geçersiz email adresi");
    } else {
      const obj = {
        email: email,
        password: password,
      };
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
  };

  return (
    <AnimatedPage>
      <Lgn.Container>
        <Lgn.Box>
          <Lgn.Logo src={Logo} />
          <Lgn.Title>Oturum Aç</Lgn.Title>
          <Lgn.InputBox>
            <Lgn.InputTitle>E-mail : </Lgn.InputTitle>
            <Lgn.Input
              placeholder="E-mail adresiniz"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Lgn.InputBox>
          <Lgn.InputBox>
            <Lgn.InputTitle>Şifre : </Lgn.InputTitle>
            <Lgn.Input
              type="password"
              placeholder="Şifreniz"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Lgn.InputBox>
          <Lgn.Button onClick={handleLogin}>Giriş yap</Lgn.Button>
          <Lgn.Button onClick={() => navigate("/register")}>
            Hesap oluştur
          </Lgn.Button>
        </Lgn.Box>
      </Lgn.Container>
    </AnimatedPage>
  );
};

export default Login;
