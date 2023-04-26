import React, { useState, useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Select,
  Alert,
  Result,
} from "antd";
import styles from "./SignupPage.module.css";
import axios from "axios";

function SignupPage() {
  const [signUp, setSignUp] = useState(false);
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
  ];

  // 닉네임 리스트 서버에 요청
  const [nicknameList, setNicknameList] = useState([]);
  const fetchNicknameList = async () => {
    const response = await axios.get("/api/profile/nickname/");
    setNicknameList(response.data.nicknameList);
    // console.log(response.data.nicknameList, nicknameList);
  };
  useEffect(() => {
    fetchNicknameList();
  }, []);

  const fetchSignUp = async (values) => {
    const accountData = {
      userEmail: values.userEmail,
      password: values.password,
    };
    let profileData = {
      nickname: values.nickname,
      major: values.major,
      gender: values.gender,
    };
    // console.log("sign up: ", accountData);
    // console.log("profile: ", profileData);

    await axios.post("/api/account/signup/", accountData).then((response) => {
      if (response.data.success) {
        setSignUp(response.data.success);
        // console.log("account 응답: ", response);
        // console.log("account 전송 데이터: ", accountData);

        //account_id
        profileData["accountId"] = response.data.accountId;
        axios.post("/api/profile/", profileData).then((response2) => {
          // console.log("profile 응답: ", response2);
          // console.log("profile 전송 데이터: ", profileData);
        });
      } else {
        message.error("에러 발생");
      }
    });
  };

  const onFinish = async (values) => {
    console.log("values: ", values);
    if (values.password !== values.okPassword) {
      message.error("비밀번호 확인이 틀립니다.");
    } else if (nicknameList.includes(values.nickname)) {
      message.error("사용할 수 없는 닉네임입니다.");
    } else {
      values.userEmail += "@cau.ac.kr";
      fetchSignUp(values);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        {signUp ? (
          <Result
            icon={<SmileOutlined />}
            title="학교 이메일로 인증 메일을 보냈어요."
            subTitle="이메일 인증을 마치면 회원가입이 완료됩니다."
          />
        ) : (
          <>
            <Alert
              message="실제와 다른 정보로 활동할 경우 계정이 영구 정지됩니다."
              banner
              closable
              className={styles.banner}
            />
            <Alert
              message="지금 입력하는 정보는 수정이 불가능합니다. 신중히 입력하세요."
              banner
              closable
              className={styles.banner}
            />

            <Form
              className={styles.form}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 8,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <div className={styles.text}>회원 가입</div>
              <Form.Item
                label="학교 이메일"
                name="userEmail"
                rules={[
                  {
                    required: true,
                    message: "학교 이메일 주소를 입력하세요.",
                  },
                ]}
              >
                <Input addonAfter="@cau.ac.kr" />
              </Form.Item>

              <Form.Item
                label="비밀번호"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "비밀번호를 입력하세요.",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="비밀번호 확인"
                name="okPassword"
                rules={[
                  {
                    required: true,
                    message: "비밀번호 확인을 입력하세요.",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="닉네임"
                name="nickname"
                rules={[
                  {
                    required: true,
                    message: "닉네임을 입력하세요.",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="학과"
                name="major"
                rules={[
                  {
                    required: true,
                    message: "학과를 입력하세요.",
                  },
                ]}
              >
                <Select
                  showSearch
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
                label="성별"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "성별을 입력하세요.",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="F">여성</Select.Option>
                  <Select.Option value="M">남성</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 8,
                }}
              >
                <Button type="primary" htmlType="submit">
                  회원가입
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}

export default SignupPage;
