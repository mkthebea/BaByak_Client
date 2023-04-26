import React from "react";
import { Button, Result } from "antd";
import styles from "./NotFound.module.css";

// 404
function NotFound() {
  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => {
              window.location.replace("/");
            }}
          >
            메인 페이지로 돌아가기
          </Button>
        }
      />
    </div>
  );
}

export default NotFound;
