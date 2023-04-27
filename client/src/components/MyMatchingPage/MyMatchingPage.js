import React, { useEffect, useState } from "react";
import styles from "./MyMatchingPage.module.css";
import { Button, Card, List, Modal, Select, Input, Form, message } from "antd";

import axios from "axios";

function MyMatchingPage() {
  const { Option } = Select;
  const { TextArea } = Input;

  const [userMatchingList, setUserMatchingList] = useState([]);

  const testData = [
    {'join_deadline' : '2023-04-28 06:00:00',
    'place' : '1층'
    },
    {'join_deadline' : '2023-04-28 12:00:00',
    'place' : '7층 엘베 앞'
    },
    {'join_deadline' : '2023-04-28 18:00:00',
    'place' : '선릉역 5번 출구'
    },
    {'join_deadline' : '2023-04-28 18:00:00',
    'place' : '선릉역 5번 출구'
    },
    {'join_deadline' : '2023-04-28 18:00:00',
    'place' : '선릉역 5번 출구'
    },
    {'join_deadline' : '2023-04-30 18:00:00',
    'place' : '선릉역 5번 출구'
    },
    {'join_deadline' : '2023-04-28 18:00:00',
    'place' : '선릉역 5번 출구'
    },
  ]

  // 내 맛칭 리스트 가져오기
  const fetchUserMatchingList = async () => {
    const response = await axios.get("/me/");

    setUserMatchingList(response.data.userMatching);
    // console.log("my matching response: ", response);
  };
  useEffect(() => {
    fetchUserMatchingList();
  }, []);

  const nowTime = new Date();
  // 남은 시간 계산
  testData.forEach((item) => {
    const diff = new Date(item.join_deadline) - nowTime;
    let remain = "";
    if (diff <= 0) {
      remain += "매칭 마감";
      item["status"] = "done";
    } else {
      const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
      const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const diffMin = Math.floor((diff / (1000 * 60)) % 60);
      if (diffMin > 0) {
        remain = diffMin + "분 ";
      }
      if (diffHour > 0) {
        remain = diffHour + "시간 ";
      }
      if (diffDay > 0) {
        remain = diffDay + "일 ";
      }
      remain += "남음";
      if (diffDay == 0 && diffHour == 0 && diffMin <= 59) {
        item["status"] = "coming";
      } else {
        item["status"] = "";
      }
    }

    item["remain"] = remain;
  });

  // 맛칭 취소 요청
  const onCancel = async (id) => {
    const response = await axios.delete(`/api/matching/${id}/leave/`);
    // console.log("delete response: ", response);
    if (response.data.success) {
      message.success("취소 완료");
      fetchUserMatchingList(); // 취소 후 내 매칭 리스트 리로드
    } else {
      message.error(response.data.errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.text}>내 맛칭</div>
        <List
          grid={{
            gutter: 16,
            column: 3,
          }}
          dataSource={testData}
          // dataSource={testData}
          className={styles.list}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={item.host}
                hoverable="true"
                headStyle={{ fontSize: "18px" }}
                className={
                  !item.status ? styles.waiting : null
                }
              >
                <div className={styles.content_container}>
                  <div>
                    <span
                      className={
                        !item.status
                          ? styles.date_text_waiting
                          : styles.date_text
                      }
                    >
                      {item.join_deadline} &nbsp;&nbsp;
                    </span>
                    <p>{item.place}</p>
                    <span
                      className={
                        !item.status
                          ? styles.diff_text_waiting
                          : styles.diff_text
                      }
                    >
                      {item.remain}
                    </span>
                  </div>
                  {item.status === "" || item.status === "매칭 대기중" ? (
                    <Button
                      onClick={() => {
                        onCancel(item.id);
                      }}
                      className={styles.content_button}
                    >
                      매칭 취소
                    </Button>
                  ) : (
                    <Button
                      disabled
                      onClick={() => {
                        onCancel(item.id);
                      }}
                      className={styles.content_button}
                    >
                      매칭 취소
                    </Button>
                  )}
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default MyMatchingPage;
