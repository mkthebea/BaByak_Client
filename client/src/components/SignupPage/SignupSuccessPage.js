import React, { useEffect, useState } from "react";
import { Result, Button, message } from "antd";
import { useLocation } from "react-router-dom";
import qs from "qs";
import styles from "./SignupPage.module.css";
import axios from "axios";

function SignupSuccessPage() {
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const token = query.token;
  const uid64 = query.uid64;
  const signupRequest = async () => {
    const response = await axios.get(`/api/account/activate/${uid64}/${token}`);
    // console.log(response);
    // if (!response.data.success) message.error("알 수 없는 오류 발생");
  };
  useEffect(() => {
    signupRequest();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <Result
          status="success"
          title="회원 가입 성공!"
          subTitle="이메일 인증을 완료했습니다."
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                window.location.replace("/login");
              }}
            >
              로그인 하러 가기
            </Button>,
          ]}
        />
      </div>
    </div>
  );
}

export default SignupSuccessPage;
