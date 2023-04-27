import React, { useState, useEffect } from "react";
import {
  Button,
  TimePicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";
import styles from "./NewMatchingPage.module.css";
import axios from "axios";

function NewMatchingPage() {
  const { TextArea } = Input;
  const { Option } = Select;

  // 모든 식당 이름 가져오기
  const [resList, setResList] = useState([]);
  const fetchResList = async () => {
    const response = await axios.get("/api/matzip/");
    // console.log("식당 리스트 response: ", response);
    if (response.data.success) {
      setResList(response.data.resList);
    } else {
      message.error(response.data.errorMessage);
    }
  };
  useEffect(() => {
    fetchResList();
  }, []);

  const onFinish = async (values) => {
    if (values.max < values.min) {
      message.error("최대 인원 수는 최소 인원 수보다 크거나 같아야 합니다.");
    } else {
      let data = values;

      // 날짜 데이터 가공
      data["date"] = data["date"].format("YYYY-MM-DD");
      data["startTime"] =
        data["date"] + " " + data["startTime"].format("HH:MM");
      delete data.date;

      // 새 맛칭 등록 요청
      const response = await axios.post("/api/matching/new/", data);
      // console.log("new matching send data: ", data);
      // console.log("new matching response: ", response);
      if (response.data.success) {
        message.success("등록 완료!");
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      } else {
        message.error(response.data.errorMessage);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <div className={styles.text}>New Matching</div>
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={onFinish}
        >
          <Form.Item
            label="만남 모드"
            name={"mode"}
            rules={[{ required: true, message: "만남 모드를 선택하세요" }]}
          >
            <Select>
              <Select.Option value="밥만 먹어요">밥만 먹어요</Select.Option>
              <Select.Option value="우리 친해져요(개발 얘기O)">
                우리 친해져요(개발 얘기O)
              </Select.Option>
              <Select.Option value="우리 친해져요(개발 얘기X)">
                우리 친해져요(개발 얘기X)
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="날짜 및 시간"
            style={{
              marginBottom: 0,
            }}
          >
            <Input.Group compact>
              <Form.Item
                name={"date"}
                rules={[{ required: true, message: "날짜를 선택하세요" }]}
                style={{ marginRight: "10px" }}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                name={"startTime"}
                rules={[{ required: true, message: "시작 시간을 선택하세요" }]}
              >
                <TimePicker />
              </Form.Item>
              <span style={{ margin: "0 10px 0 10px", lineHeight: "30px" }}>
                {" "}
                부터{" "}
              </span>
              <Form.Item
                name={"duration"}
                rules={[
                  { required: true, message: "총 매칭 시간을 선택하세요" },
                ]}
              >
                <Select style={{ width: "10vw" }}>
                  <Select.Option value="0시간 30분">0시간 30분</Select.Option>
                  <Select.Option value="1시간 0분">1시간 0분</Select.Option>
                  <Select.Option value="1시간 30분">1시간 30분</Select.Option>
                  <Select.Option value="2시간 0분">2시간 0분</Select.Option>
                  <Select.Option value="2시간 30분">2시간 30분</Select.Option>
                  <Select.Option value="3시간 0분">3시간 0분</Select.Option>
                  <Select.Option value="3시간 30분">3시간 30분</Select.Option>
                  <Select.Option value="4시간 0분">4시간 0분</Select.Option>
                  <Select.Option value="4시간 30분">4시간 30분</Select.Option>
                </Select>
              </Form.Item>
              <span style={{ margin: "0 10px 0 10px", lineHeight: "30px" }}>
                {" "}
                동안{" "}
              </span>
            </Input.Group>
          </Form.Item>
          <Form.Item
            label="최대 인원"
            name={"max"}
            rules={[{ required: true, message: "최대 인원을 입력하세요" }]}
          >
            <InputNumber min={2} max={10} defaultValue={3} />
          </Form.Item>
          <Form.Item
            label="매칭 소개"
            name={"description"}
            rules={[{ required: true, message: "한줄 소개를 입력하세요" }]}
          >
            <TextArea rows={3} placeholder="maxLength is 30" maxLength={30} />
          </Form.Item>
          <Form.Item
            label="약속 장소"
            name={"place"}
            rules={[{ required: true, message: "약속 장소를 입력하세요" }]}
          >
            <TextArea rows={1} placeholder="maxLength is 30" maxLength={30} />
          </Form.Item>
          <Form.Item
            className={styles.button_container}
            wrapperCol={{
              offset: 11,
            }}
          >
            <Button type="primary" htmlType="submit" className={styles.button}>
              등록하기
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default NewMatchingPage;
