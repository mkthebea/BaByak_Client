import React, { useEffect, useState } from "react";
import styles from "./MyMatchingPage.module.css";
import { Button, Card, List, Select, Input, message } from "antd";
import axios from "axios";
import { getMyMatchings } from "../../api/matchings";
import { getCookie } from "../../api/util";

function MyMatchingPage() {
  const { Option } = Select;
  const { TextArea } = Input;

  const [userMatchingList, setUserMatchingList] = useState([]);

  const testData = [
    {
      host: "김민경",
      status: "모집중",
      starts_at: "2023-04-28 06:00:00",
      place: "1층",
      joined: ["김민경", "김혜연"],
    },
    {
      host: "김민경",
      status: "모집중",
      starts_at: "2023-04-28 12:00:00",
      place: "7층 엘베 앞",
      joined: ["김민경", "김혜연"],
    },
    {
      host: "김민경",
      status: "모집중",
      starts_at: "2023-04-28 18:00:00",
      place: "선릉역 5번 출구",
      joined: ["김민경", "김혜연"],
    },
    {
      host: "김민경",
      status: "모집중",
      starts_at: "2023-04-28 18:00:00",
      place: "선릉역 5번 출구",
      joined: ["김민경", "김혜연"],
    },
    {
      host: "김민경",
      status: "모집중",
      starts_at: "2023-04-28 18:00:00",
      place: "선릉역 5번 출구",
      joined: ["김민경", "김혜연"],
    },
    {
      host: "김민경",
      status: "모집중",
      starts_at: "2023-04-30 18:00:00",
      place: "선릉역 5번 출구",
      joined: ["김민경", "김혜연"],
    },
    {
      host: "김민경",
      status: "모집 완료",
      starts_at: "2023-04-28 18:00:00",
      place: "선릉역 5번 출구",
      joined: ["김민경", "김혜연"],
    },
  ];

  // 내 맛칭 리스트 가져오기
  const fetchUserMatchingList = async () => {
    // const response = await axios.get("/me/");
    const response = getMyMatchings()
      .then((resp) => {
        setUserMatchingList(resp.data);
        console.log(resp);
      })
      .catch((error) => {});

    // console.log("my matching response: ", response);
  };
  useEffect(() => {
    fetchUserMatchingList();
  }, []);

  const nowTime = new Date();
  // 남은 시간 계산
  testData.forEach((item) => {
    const diff = new Date(item.starts_at) - nowTime;
    let remain = "";
    if (diff <= 0) {
      remain += "매칭 마감";
      // item["status"] = "모집 완료";
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
      // if (diffDay === 0 && diffHour === 0 && diffMin <= 59) {
      //   item["status"] = "모집중";
      // } else {
      //   item["status"] = "";
      // }
    }

    item["remain"] = remain;
  });

  // 맛칭 취소 요청
  const onCancel = async (id) => {
    axios
      .post(
        `/api/matchings/${id}/leave`,
        {},
        {
          headers: {
            "x-csrftoken": getCookie("csrftoken"),
          },
        }
      )
      .then((resp) => {
        fetchUserMatchingList();
      })
      .catch((err) => {
        const status = err.response.status;

        if (status === 400) {
          message.error(err.response.body.message);
        } else {
          message.error("알 수 없는 에러입니다.");
        }
      });

    // const response = await axios.delete(`/api/matching/${id}/leave/`);
    // // console.log("delete response: ", response);
    // if (response.data.success) {
    //   message.success("취소 완료");
    //   fetchUserMatchingList(); // 취소 후 내 매칭 리스트 리로드
    // } else {
    //   message.error(response.data.errorMessage);
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.text}>My Matching</div>
        <List
          grid={{
            gutter: 16,
            column: 3,
          }}
          dataSource={userMatchingList}
          className={styles.list}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable="true"
                headStyle={{ fontSize: "18px" }}
                className={styles.waiting}
              >
                <div className={styles.content_container}>
                  <div>
                    <p className={styles.date_text_waiting}>
                      {item.starts_at} &nbsp;&nbsp;
                    </p>
                    <span>약속 장소: {item.place}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.diff_text}>{item.remain}</span>
                    <p className={styles.people}>
                      주최자: {item.host} &nbsp;&nbsp; 참여자:
                      {item.joined_members.join(" ")}
                    </p>
                  </div>
                  {item.status === "모집중" ? (
                    <Button
                      onClick={() => {
                        onCancel(item.id);
                      }}
                      className={styles.content_button}
                    >
                      매칭 취소
                    </Button>
                  ) : (
                    <Button disabled className={styles.content_button}>
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
