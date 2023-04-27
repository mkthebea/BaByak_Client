import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  ClockCircleOutlined,
  PlusCircleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, message } from "antd";
// import "antd/dist/antd.min.css";
import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailPage from "./components/DetailPage/DetailPage";
import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from "./components/MainPage/MainPage";
import MyMatchingPage from "./components/MyMatchingPage/MyMatchingPage";
import SignupPage from "./components/SignupPage/SignupPage";
import SignupSuccessPage from "./components/SignupPage/SignupSuccessPage";
import NewMatchingPage from "./components/NewMatchingPage/NewMatchingPage";
import AuthFailedPage from "./components/AuthFailedPage/AuthFailedPage";
import NotFound from "./components/NotFound/NotFound";

import axios from "axios";
import styles from "./App.module.css";
import Logo from "./swm.png";
import { doLogout, loginCheck } from "./api/users";
import { removeCookie } from "./api/util";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  axios.defaults.withCredentials = true;

  // 로그인 상태 확인
  const [login, setLogin] = useState(false);
  const fetchLogin = async () => {
    loginCheck()
      .then((loginResult) => {
        setLogin(true);
      })
      .catch((error) => {
        if (error.code === "ERR_BAD_REQUEST") {
          setLogin(false);
        }
      });
  };
  useEffect(() => {
    fetchLogin();
  }, []);

  // 로그아웃
  const logout = async () => {
    doLogout()
      .then((logoutResult) => {
        message.success("로그아웃 완료");
        setLogin(false);
        // setTimeout(() => {
        //   window.location.replace("/");
        // }, 1000);
        removeCookie("csrftoken");
        removeCookie("sessionid");
      })
      .catch((error) => {
        message.success("로그아웃 실패");
        setLogin(false);
        console.log(error);
        // setTimeout(() => {
        //   window.location.replace("/");
        // }, 1000);
      });
  };

  return (
    <Router>
      <Layout className={styles.font}>
        <Layout className="site-layout">
          <Header
            className={styles.header}
            style={{ backgroundColor: "#3D56B2" }}
          >
            <img src={Logo} className={styles.logo} />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["main"]}
              style={{
                // backgroundColor: "white",
                color: "rgb(5,109,178)",
                // fontSize: "50px",
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
                width: "50%",
                height: "10vh",
                backgroundColor: "#3D56B2",
                color: "white",
              }}
            >
              <Menu.Item
                key="main"
                icon={<HomeOutlined />}
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Link to="/" className={styles.menu_link}>
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item
                key="mymatching"
                icon={<ClockCircleOutlined />}
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Link to="/mymatching" className={styles.menu_link}>
                  My Matching
                </Link>
              </Menu.Item>
              {login ? (
                <Menu.Item
                  key="logout"
                  icon={<LogoutOutlined />}
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div onClick={logout} className={styles.menu_link}>
                    Logout
                  </div>
                </Menu.Item>
              ) : (
                <Menu.Item
                  key="login"
                  icon={<LoginOutlined />}
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Link to="/login" className={styles.menu_link}>
                    Login
                  </Link>
                </Menu.Item>
              )}
            </Menu>
            <div className={styles.food_container}>
              <div className={styles.text}>
                <span className={styles.desc}>
                  소마인의 밥약 매칭&nbsp;&nbsp;&nbsp;
                </span>
                뺩약 &nbsp;&nbsp;&nbsp;
              </div>
              <div className={styles.food}>🍔</div>
              <div className={styles.food2}>🍜</div>
              <div className={styles.food}>🍕</div>
              <div className={styles.food2}>🥗</div>
              <div className={styles.food}>🍦</div>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              height: "90vh",
              minHeight: 280,
              backgroundColor: "#F6F1F1",
              padding: 24,
            }}
          >
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signup/success" element={<SignupSuccessPage />} />
              <Route path="/detail" element={<DetailPage />} />
              <Route path="/mymatching" element={<MyMatchingPage />} />
              {/* <Route
                path="/mymatching"
                element={login ? <MyMatchingPage /> : <AuthFailedPage />}
              /> */}
              <Route path="/newmatching" element={<NewMatchingPage />} />
              {/* <Route
                path="/newmatching"
                element={login ? <NewMatchingPage /> : <AuthFailedPage />}
              /> */}
              <Route path="/authfailed" element={<AuthFailedPage />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Content>
          {/* <Footer
            style={{
              textAlign: "center",
            }}
          >
            MatChing ©2022 Created by SanSuO
          </Footer> */}
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
