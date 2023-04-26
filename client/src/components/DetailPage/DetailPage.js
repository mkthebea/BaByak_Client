import React, { useState, useEffect } from "react";
import { Badge, Descriptions, Radio, Tabs, Button } from "antd";
import styles from "./DetailPage.module.css";
import moment from "moment";
import "moment/locale/ko";

function DetailPage(props) {
  const data = props.data;
  const name = data.name;
  const waiting = data.waiting;
  // const tags = data.tags;
  // const date = data.date;
  // const description = data.description;
  // const max = data.max;
  // const id = data.id;
  const matchings = data.matchings;

  // 매칭 id 초기화

  useEffect(() => {
    if (waiting !== 0) {
      props.setId(matchings[0].id);
    }
  }, [matchings[0].id]);
  // }, []);

  const { TabPane } = Tabs;

  return (
    <div className={styles.container}>
      {waiting === 0 ? (
        // 대기 팀 수 0일 경우
        <Tabs
          defaultActiveKey="0"
          tabPosition="left"
          style={{
            height: 400,
          }}
          // onTabClick={(i) => {
          //   props.setButtonDisabled(true);
          // }}
        >
          <TabPane tab={"새 매칭"} key={-1}>
            <div className={styles.new_matching_container}>
              <div className={styles.new_matching_text}>
                원하는 조건이 없나요?
              </div>
              <Button
                onClick={() => {
                  window.location.replace("/newmatching");
                }}
              >
                새로 등록하기
              </Button>
            </div>
          </TabPane>
        </Tabs>
      ) : (
        <Tabs
          defaultActiveKey="0"
          tabPosition="left"
          style={{
            height: 400,
          }}
          onChange={(i) => {
            if (i == -1) {
              props.setButtonDisabled(true);
            } else {
              props.setButtonDisabled(false);
              if (i >= 0) props.setId(matchings[i].id);
            }
          }}
        >
          {[
            ...Array.from(
              {
                length: waiting + 1,
              },
              (_, i) => i
            ),
          ].map((i) =>
            i === waiting ? (
              <TabPane tab={"새 매칭"} key={-1}>
                <div className={styles.new_matching_container}>
                  <div className={styles.new_matching_text}>
                    원하는 조건이 없나요?
                  </div>
                  <Button
                    onClick={() => {
                      window.location.replace("/newmatching");
                    }}
                  >
                    새로 등록하기
                  </Button>
                </div>
              </TabPane>
            ) : (
              <TabPane tab={`매칭 ${i + 1}`} key={i}>
                <Descriptions title="매칭 정보" bordered>
                  <Descriptions.Item label="맛집">{name}</Descriptions.Item>
                  <Descriptions.Item label="주최자">
                    {matchings[i].leader}
                  </Descriptions.Item>
                  <Descriptions.Item label="대기자">
                    총 {[...matchings[i].follower].length}명
                    {matchings[i].follower.map((f) => {
                      return <div key={f}>{f}</div>;
                    })}
                  </Descriptions.Item>
                  <Descriptions.Item label="최대 인원">
                    {matchings[i].max}
                  </Descriptions.Item>
                  <Descriptions.Item label="최소 인원">
                    {matchings[i].min}
                  </Descriptions.Item>

                  <Descriptions.Item label="매칭 조건">
                    성별:{" "}
                    {[...matchings[i].tags][0] === "F"
                      ? "여성"
                      : [...matchings[i].tags][0] === "M"
                      ? "남성"
                      : "성별 무관"}{" "}
                    <br />
                    학과: {[...matchings[i].tags][1]} <br />
                    만남 모드:{" "}
                    {[...matchings[i].tags][2]
                      ? "우리 친해져요"
                      : "밥만 먹어요"}{" "}
                    <br />
                  </Descriptions.Item>
                  <Descriptions.Item label="시작 시간">
                    {matchings[i].startTime}
                  </Descriptions.Item>
                  <Descriptions.Item label="끝나는 시간">
                    {matchings[i].endTime}
                  </Descriptions.Item>
                  <Descriptions.Item label="매칭 시간">
                    {matchings[i].duration}
                  </Descriptions.Item>
                  <Descriptions.Item label="한줄 소개">
                    {matchings[i].description}
                  </Descriptions.Item>
                </Descriptions>
              </TabPane>
            )
          )}
        </Tabs>
      )}
    </div>
  );
}

export default DetailPage;
