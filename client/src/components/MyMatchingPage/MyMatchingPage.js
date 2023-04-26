import React, { useEffect, useState } from "react";
import styles from "./MyMatchingPage.module.css";
import { Button, Card, List, Modal, Select, Input, Form, message } from "antd";

import axios from "axios";

function MyMatchingPage() {
  const { Option } = Select;
  const { TextArea } = Input;

  const [userMatchingList, setUserMatchingList] = useState([]);

  // 내 맛칭 리스트 가져오기
  const fetchUserMatchingList = async () => {
    const response = await axios.get("/api/profile/my-matchings/");
    setUserMatchingList(response.data.userMatching);
    // console.log("my matching response: ", response);
  };
  useEffect(() => {
    fetchUserMatchingList();
  }, []);

  const nowTime = new Date();
  // 남은 시간 계산
  userMatchingList.forEach((item) => {
    const diff = new Date(item.date) - nowTime;
    let remain = "";
    if (diff <= 0) {
      remain += "매칭 완료";
      item["status"] = "done";
    } else {
      const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
      if (diffDay > 0) {
        remain += diffDay + "일 ";
      }
      const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
      if (diffHour > 0) {
        remain += diffHour + "시간 ";
      }
      const diffMin = Math.floor((diff / (1000 * 60)) % 60);
      if (diffMin > 0) {
        remain += diffMin + "분 ";
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
    const response = await axios.delete(`/api/matching/${id}/cancel/`);
    // console.log("delete response: ", response);
    if (response.data.success) {
      message.success("취소 완료");
      fetchUserMatchingList(); // 취소 후 내 매칭 리스트 리로드
    } else {
      message.error(response.data.errorMessage);
    }
  };

  // 신고 모달 열기
  const onReport = (id, follower) => {
    setIsModalVisible(true);
    setModalData(follower);
    setModalId(id);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]); // 신고 모달에 보여줄 follower
  const [modalId, setModalId] = useState(0); // 신고 시 보낼 매칭 id

  // 신고 모달 닫기
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    let reportData = values;
    reportData["id"] = modalId;

    // 신고 요청 보내기
    const response = await axios.post("/api/profile/report/", values);
    // console.log("report send data: ", values);
    // console.log("report response: ", response);
    if (response.data.success) {
      message.success("신고 완료");
      setTimeout(() => {
        setIsModalVisible(false);
      }, 1000);
    } else {
      message.error("알 수 없는 에러: 신고 요청 실패");
    }
  };

  // 테스트 데이터
  // const testData = [
  //   {
  //     name: "북촌순두부",
  //     date: "2022-09-11 16:00",
  //     id: 4,
  //     follower: ["밈갬", "영갬"],

  //     is_closed: false, //추가 - 매칭시간이 지난경우 true
  //     is_matched: false, //추가 - 최소인원이 넘어서 매칭이 성사된 경우 true
  //   },
  //   {
  //     name: "우뇽파스타",
  //     date: "2022-09-10 13:00",
  //     id: 1,
  //     follower: ["밈갬", "영갬", "오구"],

  //     // 매칭 인원 모이길 대기중
  //     is_closed: false,
  //     is_matched: false,
  //   },
  //   {
  //     name: "중대양곱창",
  //     date: "2022-08-22 21:00",
  //     id: 2,
  //     follower: ["밈갬", "오구"],

  //     // 매칭이 성사되어 끝남
  //     is_closed: true,
  //     is_matched: true,
  //   },
  //   {
  //     name: "피맥하우스",
  //     date: "2022-09-10 01:50",
  //     id: 3,
  //     follower: ["영갬", "오구"],

  //     // 매칭이 성사되었고 아직 시작 전
  //     is_closed: false,
  //     is_matched: true,
  //   },
  // ];
  // testData.forEach((item) => {
  //   const diff = new Date(item.date) - nowTime;
  //   let remain = "";

  //   if (!item.is_closed && !item.is_matched) {
  //     remain += "매칭 대기중";
  //     item["status"] = "매칭 대기중";
  //   } else if (diff <= 0) {
  //     remain += "매칭 완료";
  //     item["status"] = "done";
  //   } else {
  //     const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  //     if (diffDay > 0) {
  //       remain += diffDay + "일 ";
  //     }
  //     const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
  //     if (diffHour > 0) {
  //       remain += diffHour + "시간 ";
  //     }
  //     const diffMin = Math.floor((diff / (1000 * 60)) % 60);
  //     if (diffMin > 0) {
  //       remain += diffMin + "분 ";
  //     }
  //     remain += "남음";
  //     if (diffDay === 0 && diffHour === 0 && diffMin <= 59) {
  //       item["status"] = "coming";
  //     } else {
  //       item["status"] = "";
  //     }
  //   }
  //   item["remain"] = remain;
  // });

  // testData.sort((a, b) => {
  //   if (a.remain > b.remain) return 1;
  //   else if (b.remain > a.remain) return -1;
  //   else return 0;
  // });

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.text}>내 맛칭</div>
        <List
          grid={{
            gutter: 16,
            column: 3,
          }}
          dataSource={userMatchingList}
          // dataSource={testData}
          className={styles.list}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={item.name}
                hoverable="true"
                headStyle={{ fontSize: "18px" }}
                className={
                  !item.is_closed && !item.is_matched ? styles.waiting : null
                }
              >
                <div className={styles.content_container}>
                  <div>
                    <span
                      className={
                        !item.is_closed && !item.is_matched
                          ? styles.date_text_waiting
                          : styles.date_text
                      }
                    >
                      {item.date} &nbsp;&nbsp;
                    </span>
                    <span
                      className={
                        !item.is_closed && !item.is_matched
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

                  {item.status === "done" ? (
                    <Button
                      onClick={() => {
                        onReport(item.id, item.member);
                      }}
                      className={styles.content_button}
                    >
                      신고하기
                    </Button>
                  ) : (
                    <Button disabled className={styles.content_button}>
                      신고하기
                    </Button>
                  )}
                </div>
              </Card>
            </List.Item>
          )}
        />
        <Modal
          title="신고하기"
          centered
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width="60%"
          className={styles.modal}
        >
          <Form
            className={styles.form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="신고할 닉네임"
              name="target"
              rules={[
                {
                  required: true,
                  message: "신고할 닉네임을 선택하세요",
                },
              ]}
            >
              <Select>
                {modalData.map((user) => (
                  <Option value={user}>{user}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="신고 항목 선택"
              name="type"
              rules={[{ required: true, message: "신고 항목을 선택하세요." }]}
            >
              <Select>
                <Option value="노쇼">노쇼</Option>
                <Option value="비매너">비매너</Option>
                <Option value="정보와 다른 사람">정보와 다른 사람</Option>
              </Select>
            </Form.Item>

            <Form.Item label="설명" name="desc">
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                신고하기
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default MyMatchingPage;
