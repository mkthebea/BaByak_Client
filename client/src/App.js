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
// import SignupPage from "./components/SignupPage/SignupPage";
// import SignupSuccessPage from "./components/SignupPage/SignupSuccessPage";
import NewMatchingPage from "./components/NewMatchingPage/NewMatchingPage";
import AuthFailedPage from "./components/AuthFailedPage/AuthFailedPage";
import NotFound from "./components/NotFound/NotFound";

import axios from "axios";
import styles from "./App.module.css";
import Logo from "./swm.png";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  axios.defaults.withCredentials = true;

  // 로그인 상태 확인
  const [login, setLogin] = useState(false);
  const fetchLogin = async () => {
    const response = await axios.get("/api/account/login_check/");
    // console.log("login check response: ", response);
    if (response.data.success) {
      setLogin(true);
    }
  };
  useEffect(() => {
    fetchLogin();
  }, []);

  // 로그아웃
  const logout = async () => {
    const response = await axios.post("/api/account/logout/");
    if (response.data.success) {
      message.success("로그아웃 완료");
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    } else {
      message.error(response.data.errorMessage);
    }
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
                fontSize: "25px",
                display: "flex",
                marginLeft: "20px",
                width: "60%",
                height: "100%",
                backgroundColor: "#3D56B2",
                color: "white",
              }}
            >
              <Menu.Item key="main" icon={<HomeOutlined />}>
                <Link to="/" className={styles.menu_link}>
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item key="mymatching" icon={<ClockCircleOutlined />}>
                <Link to="/mymatching" className={styles.menu_link}>
                  My Matching
                </Link>
              </Menu.Item>
              {login ? (
                <Menu.Item key="logout" icon={<LogoutOutlined />}>
                  <div onClick={logout} className={styles.menu_link}>
                    Logout
                  </div>
                </Menu.Item>
              ) : (
                <Menu.Item key="login" icon={<LoginOutlined />}>
                  <Link to="/login" className={styles.menu_link}>
                    Login
                  </Link>
                </Menu.Item>
              )}
            </Menu>
            <div className={styles.food_container}>
              <div className={styles.text}>
                소마인의 밥약 매칭&nbsp;&nbsp;&nbsp;
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
              {/* <Route path="/signup" element={<SignupPage />} />
              <Route path="/signup/success" element={<SignupSuccessPage />} /> */}
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
