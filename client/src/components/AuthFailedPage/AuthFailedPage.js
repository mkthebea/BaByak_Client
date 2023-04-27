import React from "react";
import { Button, Result } from "antd";
import styles from "./AuthFailed.module.css";

function AuthFailedPage() {
  return (
    <div className={styles.container}>
      <Result
        status="403"
        title="접근 권한 없음"
        subTitle="Sorry, you can't access this page unless you sign up for BaByak."
        extra={
          <Button
            type="primary"
            onClick={() => {
              window.location.replace("/login");
            }}
          >
            Log In
          </Button>
        }
      />
    </div>
  );
}

export default AuthFailedPage;
