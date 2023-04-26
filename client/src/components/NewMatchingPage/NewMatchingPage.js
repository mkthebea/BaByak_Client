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
  const majors = [
    "AI학과",
    "간호학과",
    "건축학부",
    "경영학부",
    "경제학부",
    "공공인재학부",
    "공연영상창작학부(서울)",
    "공연영상창작학부(안성)",
    "광고홍보학과",
    "교육학과",
    "국어국문학과",
    "국제물류학과",
    "글로벌예술학부",
    "기계공학부",
    "도시계획·부동산학과",
    "디자인학부",
    "문헌정보학과",
    "물리학과",
    "미디어커뮤니케이션학부",
    "미술학부",
    "사회기반시스템공학부",
    "사회복지학부",
    "사회학과",
    "산업보안학과",
    "생명과학과",
    "생명자원공학부",
    "소프트웨어학부",
    "수학과",
    "스포츠과학부",
    "시스템생명공학과",
    "식품공학부",
    "심리학과",
    "아시아문화학부",
    "약학부",
    "에너지시스템공학부",
    "역사학과",
    "영어교육과",
    "영어영문학과",
    "예술공학부",
    "유럽문화학부",
    "유아교육과",
    "융합공학부",
    "음악학부",
    "응용통계학과",
    "의학부",
    "전자전기공학부",
    "전통예술학부",
    "정치국제학과",
    "지식경영학부",
    "차세대반도체학과",
    "철학과",
    "첨단소재공학과",
    "체육교육과",
    "화학과",
    "화학신소재공학부",
    "학과 무관",
  ];

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
        <div className={styles.text}>새 맛칭</div>
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
            label="식당 이름"
            name={"name"}
            rules={[{ required: true, message: "식당 이름을 선택하세요" }]}
          >
            <Select
              showSearch
              placeholder="식당 검색"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {resList.map((r) => (
                <Option value={r}>{r}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="성별"
            name={"gender"}
            rules={[{ required: true, message: "성별을 선택하세요" }]}
          >
            <Select>
              <Select.Option value="F">여성</Select.Option>
              <Select.Option value="M">남성</Select.Option>
              <Select.Option value="X">성별 무관</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="학과"
            name={"major"}
            rules={[{ required: true, message: "학과를 선택하세요" }]}
          >
            <Select
              showSearch
              placeholder="학과 검색"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {majors.map((m) => (
                <Option value={m}>{m}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="만남 모드"
            name={"mode"}
            rules={[{ required: true, message: "만남 모드를 선택하세요" }]}
          >
            <Select>
              <Select.Option value={false}>밥만 먹어요</Select.Option>
              <Select.Option value={true}>우리 친해져요</Select.Option>
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
            label="최소 인원"
            name={"min"}
            rules={[{ required: true, message: "최소 인원을 입력하세요" }]}
          >
            <InputNumber min={2} max={9} defaultValue={2} />
          </Form.Item>
          <Form.Item
            label="최대 인원"
            name={"max"}
            rules={[{ required: true, message: "최대 인원을 입력하세요" }]}
          >
            <InputNumber min={2} max={10} defaultValue={3} />
          </Form.Item>
          <Form.Item
            label="한줄 소개"
            name={"description"}
            rules={[{ required: true, message: "한줄 소개를 입력하세요" }]}
          >
            <TextArea rows={3} placeholder="maxLength is 30" maxLength={30} />
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
