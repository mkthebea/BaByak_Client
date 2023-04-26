import React from "react";
import { Button, Result } from "antd";

function AuthFailedPage() {
  return (
    <Result
      status="403"
      title="접근 권한 없음"
      subTitle="Sorry, you can't access this page unless you sign up for Matching."
      extra={
        <Button
          type="primary"
          onClick={() => {
            window.location.replace("/login");
          }}
        >
          로그인
        </Button>
      }
    />
  );
}

export default AuthFailedPage;
