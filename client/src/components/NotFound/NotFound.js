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
            Back to Home
          </Button>
        }
      />
    </div>
  );
}

export default NotFound;
