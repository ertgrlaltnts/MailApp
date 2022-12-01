import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from "../src/views/Home/Home.js";
import Login from "./views/Login/Login.js";
import Register from "./views/Register/Register.js";
import axios from "axios";
import { loginUser } from "./store/reducers/User.js";

const App = () => {
  const dispatch = useDispatch((state) => state.User);
  const { isLoggedIn } = useSelector((state) => state.User);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const currentUser = await axios.get(
          `http://${process.env.REACT_APP_IP}/user/${token}`
        );
        const messagesData = await axios.get(
          `http://${process.env.REACT_APP_IP}/mail/open/${currentUser.data.user._id}`
        );

        dispatch(
          loginUser({
            user: currentUser.data.user,
            messages: messagesData.data.messagesData,
            stars: messagesData.data.starsData,
            drafts: currentUser.data.user.drafts,
            trash: messagesData.data.trashData,
          })
        );
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <React.Fragment>
      <AnimatePresence exitBeforeEnter>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default App;
