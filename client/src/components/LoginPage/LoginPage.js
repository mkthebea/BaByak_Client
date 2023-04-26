import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, Checkbox, Form, Input, message } from "antd";
import styles from "./LoginPage.module.css";
import axios from "axios";

function LoginPage() {
  const onFinish = async (values) => {
    // 로그인 성공시 메인 페이지로 이동
    let loginData = values;
    loginData["email"] += "@cau.ac.kr";

    const response = await axios.post("/api/account/login/", loginData);
    console.log("login send data: ", values);
    console.log("login response: ", response);
    if (response.data.success) {
      message.success("로그인 성공");
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    } else {
      message.error("로그인 실패");
    }

    // fetchLogin();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.text}>Login</div>
        <Form
          className={styles.form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="ID"
            name="id"
            rules={[
              {
                required: true,
                message: "Enter ID",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="PW"
            name="password"
            rules={[{ required: true, message: "Enter password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <span style={{ marginLeft: "50px" }}>No Account? </span>
            <Link to="/signup">
              <u>Sign Up</u>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
