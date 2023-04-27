import { Descriptions } from "antd";
import "moment/locale/ko";
import React, { useEffect } from "react";
import styles from "./DetailPage.module.css";

function DetailPage(props) {
  const data = props.data;
  console.log(props);

  const people_limit = data.people_limit;
  const starts_at = data.starts_at;
  const ends_at = data.ends_at;
  const description = data.description;
  const joined_members = data.joined_members;

  // 매칭 id 초기화
  useEffect(() => {
    props.setId(props.data.id);
  });

  return (
    <div className={styles.container}>
      <Descriptions bordered>
        <Descriptions.Item label="한줄 소개" span={4}>
          {description.length === 0 ? "소개가 없습니다." : description}
        </Descriptions.Item>
        <Descriptions.Item label="참여자" span={2}>
          {joined_members.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="최대 인원" span={2}>
          {people_limit !== null ? people_limit : "제한 없음"}
        </Descriptions.Item>
        <Descriptions.Item label="시작 시간" span={2}>
          {starts_at}
        </Descriptions.Item>
        <Descriptions.Item label="끝나는 시간" span={2}>
          {ends_at}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default DetailPage;
