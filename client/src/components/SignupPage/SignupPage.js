import React, { useState, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Select,
  Alert,
  Result,
} from "antd";
import styles from "./SignupPage.module.css";
import axios from "axios";

function SignupPage() {
  const [signUp, setSignUp] = useState(false);

  const onFinish = async (values) => {
    console.log("values: ", values);
    if (values.password !== values.okPassword) {
      message.error("비밀번호 확인이 틀립니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        {signUp ? (
          <Result
            icon={<SmileOutlined />}
            title="학교 이메일로 인증 메일을 보냈어요."
            subTitle="이메일 인증을 마치면 회원가입이 완료됩니다."
          />
        ) : (
          <>
            <Alert
              message="실제와 다른 정보로 활동할 경우 계정이 영구 정지됩니다."
              banner
              closable
              className={styles.banner}
            />
            <Alert
              message="지금 입력하는 정보는 수정이 불가능합니다. 신중히 입력하세요."
              banner
              closable
              className={styles.banner}
            />

            <Form
              className={styles.form}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 8,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <div className={styles.text}>Sign up</div>
              <Form.Item
                label="아이디"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "이메일 주소를 입력하세요.",
                  },
                ]}
              >
                <Input/>
              </Form.Item>

              <Form.Item
                label="비밀번호"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "비밀번호를 입력하세요.",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="비밀번호 확인"
                name="okPassword"
                rules={[
                  {
                    required: true,
                    message: "비밀번호 확인을 입력하세요.",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="이름"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "이름을 입력하세요.",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 8,
                }}
              >
                <Button type="primary" htmlType="submit">
                  회원가입
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}

export default SignupPage;
