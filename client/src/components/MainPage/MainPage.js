import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Modal, message } from "antd";
import Highlighter from "react-highlight-words";
import styles from "./MainPage.module.css";
import axios from "axios";

import DetailPage from "../DetailPage/DetailPage";
import { getMatchings } from "../../api/users";
import { stringfy_date } from "../../api/util";

function MainPage() {
  // 모달 관리
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    waiting: 0,
    tags: [],
    date: "",
    description: "",
    id: 0,
  });

  // 모달 키 관리
  const [Id, setId] = useState(0);

  // 모달 버튼 관리
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const showModal = (data) => {
    // if (data.waiting === 0) setButtonDisabled(true);
    setModalData(data);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    console.log("매칭 신청: ", { id: Id });
    // console.log(matchingList);

    // 매칭 신청 요청 보내기
    // const res = joinMatching();
    const response = await axios.post(`/api/matching/${Id}/join/`);
    if (response.data.success) {
      message.success("신청 완료!");
      setTimeout(() => {
        setIsModalVisible(false);
      }, 1000);
    } else {
      message.error(response.data.errorMessage);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [matchingList, setMatchingList] = useState([]);

  const fetchMatchingList = async () => {
    // const response = await axios.get("/api/matzip/now/");
    const response = await getMatchings();

    if (response.status === 200) {
      response.data = response.data.map((v) => {
        const join_status =
          v.people_limit === null
            ? `${v.joined_members.length}/N`
            : `${v.joined_members.length}/${v.people_limit}`;

        return {
          ...v,
          join_status,
          starts_at: stringfy_date(new Date(v.starts_at)),
          ends_at: stringfy_date(new Date(v.ends_at)),
        };
      });

      setMatchingList(response.data);
    } else {
      console.log("error occurred:", response);
    }
  };

  useEffect(() => {
    fetchMatchingList();
  }, []);

  //   matchingList.forEach((m) => {
  //     if (m.waiting === 0) m.tags = [];
  //     else {
  //       m.tags = [
  //         ...new Set(
  //           m.matchings.reduce((acc, cur) => {
  //             acc.push(...cur.tags);
  //             return acc;
  //           }, [])
  //         ),
  //       ];
  //     }
  //   });

  // 검색창 관리
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState(0);
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // 테이블 데이터
  const columns = [
    {
      title: "매칭 상태",
      dataIndex: "status",
      width: "100px",
      align: "center",
      render: (_, { status }) => (
        <>
          {[status].map(() => {
            let color = status.length > 5 ? "geekblue" : "green";
            let text = status;
            if (status === "마감 임박") {
              color = "volcano";
              text = "마감 임박";
            } else if (status === "모집중") {
              color = "geekblue";
              text = "모집중";
            }
            return (
              <Tag color={color} key={status}>
                {text}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "참여 현황",
      dataIndex: "join_status",
      width: "100px",
      align: "center",
    },
    {
      title: "시작 시간",
      dataIndex: "starts_at",
      key: "starts_at",
      // sorter: (a, b) => a.starts_at - b.starts_at,
      // sortDirections: ["descend", "ascend"],
      width: "100px",
      align: "center",
    },
    {
      title: "마감 시간",
      dataIndex: "ends_at",
      key: "ends_at",
      // sorter: (a, b) => a.ends_at - b.ends_at,
      // sortDirections: ["descend", "ascend"],
      width: "100px",
      align: "center",
    },
    {
      title: "매칭 신청",
      key: "action",
      render: (testData) => (
        <Space>
          <Button onClick={() => showModal(testData)}>신청하기😋</Button>
        </Space>
      ),
      width: "150px",
      align: "center",
    },
  ];
  const testData = [
    {
      status: "마감 임박",
      people_limit: 5,
      joined: ["김민경", "김혜연"],
      starts_at: "2022-08-10 15:00",
      ends_at: "2022-08-10 18:00",
      matching_id: 1,
      description: "떡볶이팟 구합니다~",
    },
    {
      status: "모집중",
      people_limit: 5,
      joined: ["김민경", "김혜연"],
      starts_at: "2022-08-10 16:00",
      ends_at: "2022-08-10 16:00",
      matching_id: 2,
      description: "떡볶이팟 구합니다~",
    },
    {
      status: "모집중",
      people_limit: 5,
      joined: ["김민경", "김혜연"],
      starts_at: "2022-08-10 16:00",
      ends_at: "2022-08-10 16:00",
      matching_id: 3,
      description: "떡볶이팟 구합니다~",
    },
    {
      status: "모집중",
      people_limit: 5,
      joined: ["김민경", "김혜연"],
      starts_at: "2022-08-10 16:00",
      ends_at: "2022-08-10 16:00",
      matching_id: 4,
      description: "떡볶이팟 구합니다~",
    },
    {
      status: "모집중",
      people_limit: 5,
      joined: ["김민경", "김혜연"],
      starts_at: "2022-08-10 16:00",
      ends_at: "2022-08-10 16:00",
      matching_id: 5,
      description: "떡볶이팟 구합니다~",
    },
    {
      status: "모집중",
      people_limit: 5,
      joined: ["김민경", "김혜연"],
      starts_at: "2022-08-10 16:00",
      ends_at: "2022-08-10 16:00",
      matching_id: 6,
      description: "떡볶이팟 구합니다~",
    },
    {
      status: "모집중",
      people_limit: 5,
      joined: ["김민경", "김혜연"],
      starts_at: "2022-08-10 16:00",
      ends_at: "2022-08-10 16:00",
      matching_id: 7,
      description: "떡볶이팟 구합니다~",
    },
    {
      status: "모집중",
      people_limit: 5,
      joined: ["김민경", "김혜연"],
      starts_at: "2022-08-10 16:00",
      ends_at: "2022-08-10 16:00",
      matching_id: 8,
      description: "떡볶이팟 구합니다~",
    },
  ];

  testData.forEach((m) => {
    m.join_status = m.joined.length + " / " + m.people_limit;
  });

  return (
    <div className={styles.main_container}>
      <h1>
        <span>대기중인 매칭</span>
      </h1>
      <div className={styles.container}>
        <div className={styles.table_container}>
          <Table
            scroll={{ y: "60vh" }}
            pagination={false}
            columns={columns}
            bordered={true}
            dataSource={matchingList}
            className={styles.table}
            // footer={() => "Footer"}
          />
        </div>
        <Modal
          title="매칭 정보"
          cancelText="취소"
          okText="신청하기"
          okButtonProps={{ disabled: buttonDisabled }}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          centered="true"
          width="80%"
          className={styles.modal}
        >
          <DetailPage
            data={modalData}
            setId={setId}
            setButtonDisabled={setButtonDisabled}
            width={300}
            className={styles.modal_contents}
          />
        </Modal>
      </div>
    </div>
  );
}

export default MainPage;
