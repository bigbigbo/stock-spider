import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Table, Statistic, Input, Space, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import todayDataSource from "../assets/stock-list.json";

const HomePage = () => {
  useEffect(() => {}, []);

  const searchInput = useRef();

  const [currPage, setCurrPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

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
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "序号",
      key: "index",
      render(...args) {
        const [, , index] = args;
        return index + 1 + (currPage - 1) * 20;
      },
    },
    {
      title: "代码",
      dataIndex: "f12",
      ...getColumnSearchProps("f12"),
    },
    {
      title: "名称",
      dataIndex: "f14",
      ...getColumnSearchProps("f14"),
    },
    {
      title: "今日数据",
      children: [
        {
          title: "最新价",
          dataIndex: "f2",
          sorter: {
            compare: (a, b) => a.f2 - b.f2,
          },
        },
        {
          title: "今日涨跌幅",
          dataIndex: "f3",
          sorter: {
            compare: (a, b) => a.f3 - b.f3,
          },
          render(value) {
            return (
              <Statistic
                value={value}
                valueStyle={{
                  fontSize: 14,
                  color: value > 0 ? "#cf1322" : "#3f8600",
                }}
                suffix="%"
              ></Statistic>
            );
          },
        },
        {
          title: "今日涨跌额",
          dataIndex: "f4",
          sorter: {
            compare: (a, b) => a.f4 - b.f4,
          },
          render(value) {
            return (
              <Statistic
                value={value}
                valueStyle={{
                  fontSize: 14,
                  color: value > 0 ? "#cf1322" : "#3f8600",
                }}
              ></Statistic>
            );
          },
        },
        {
          title: "成交量(手)",
          dataIndex: "f5",
          sorter: {
            compare: (a, b) => a.f5 - b.f5,
          },
          render(value) {
            return (
              <Statistic
                value={value}
                valueStyle={{
                  fontSize: 14,
                }}
              ></Statistic>
            );
          },
        },
        {
          title: "成交量额",
          dataIndex: "f6",
          sorter: {
            compare: (a, b) => a.f6 - b.f6,
          },
          render(value) {
            return (
              <Statistic
                value={value}
                valueStyle={{
                  fontSize: 14,
                }}
              ></Statistic>
            );
          },
        },
      ],
    },

    {
      title: "市盈率(动态)",
      dataIndex: "f9",
      sorter: {
        compare: (a, b) => a.f9 - b.f9,
      },
    },
    {
      title: "年初至今涨幅",
      dataIndex: "f24",
      sorter: {
        compare: (a, b) => a.f24 - b.f24,
      },
      render(value) {
        return (
          <Statistic
            value={value}
            valueStyle={{
              fontSize: 14,
              color: value > 0 ? "#cf1322" : "#3f8600",
            }}
            suffix="%"
          ></Statistic>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 16, backgroundColor: "#fff" }}>
      <Table
        bordered
        rowKey="f12"
        size="middle"
        columns={columns}
        dataSource={todayDataSource}
        pagination={{
          pageSize: 20,
          onChange(page) {
            setCurrPage(page);
          },
        }}
      ></Table>
    </div>
  );
};

export default HomePage;
