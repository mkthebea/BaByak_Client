import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Radio, Tabs, Button } from "antd";
import styles from "./DetailPage.module.css";
import moment from "moment";
import "moment/locale/ko";

function DetailPage(props) {
  const data = props.data;
  console.log(props);

  // const name = data.name;
  // const waiting = data.waiting;
  // // const tags = data.tags;
  // // const date = data.date;
  // // const description = data.description;
  // // const max = data.max;
  // // const id = data.id;
  // const matchings = data.matchings;

  const people_limit = data.people_limit;
  const joined_status = data.joined_status;
  const start_time = data.start_time;
  const end_time = data.end_time;
  const description = data.description;
  const joined = data.joined;
  const id = data.id;

  // 매칭 id 초기화

  // useEffect(() => {
  //   if (waiting !== 0) {
  //     props.setId(matchings[0].id);
  //   }
  // }, [matchings[0].id]);

  console.log(data.description);

  return (
    <div className={styles.container}>
      <Descriptions bordered>
        <Descriptions.Item label="한줄 소개" span={4}>
          {data.description}
        </Descriptions.Item>
        <Descriptions.Item label="참여자" span={2}>
          {joined.join(" ")}
        </Descriptions.Item>
        <Descriptions.Item label="최대 인원" span={2}>
          {people_limit}
        </Descriptions.Item>

        <Descriptions.Item label="시작 시간" span={2}>
          {start_time}
        </Descriptions.Item>
        <Descriptions.Item label="끝나는 시간" span={2}>
          {end_time}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default DetailPage;
