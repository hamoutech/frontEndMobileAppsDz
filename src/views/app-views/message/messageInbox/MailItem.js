import React, { useState, useEffect } from "react";
import { Table, Avatar, Badge, Tooltip, Dropdown, Menu, Input } from "antd";
import {
  StarOutlined,
  StarFilled,
  DeleteOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchMessages } from "store/slices/messageSlice";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";

const MailItem = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading, messages, error } = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(t("Failed to retreive data. Please try again later."));
    }
  }, [error]);
  const params = useParams();
  const navigate = useNavigate();

  const [mails, setMails] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (keys) => {
    setSelectedRowKeys(keys);
  };

  const onStarTicked = (elm) => {
    const { id, starred } = elm;
    setMails((prevMails) =>
      prevMails.map((item) => {
        if (item.id === id) {
          item.starred = !starred;
          return item;
        }
        return item;
      })
    );
  };

  const formatBody = (body) => {
    return body.replace(/<(?:.|\n)*?>/gm, " ");
  };

  const massDeleted = (selectedKey) => {
    let data = mails;
    selectedKey.forEach((num) => {
      data = data.filter((elm) => elm.id !== num);
    });
    setMails(data);
    setSelectedRowKeys([]);
  };

  const massStar = (selectedKey) => {
    let data = mails;
    selectedKey.forEach((num) => {
      data = data.map((elm) => {
        if (elm.id === num) {
          elm.starred = true;
          return elm;
        } else return elm;
      });
    });
    setMails(data);
    setSelectedRowKeys([]);
  };

  const massCategorize = (label, selectedKey) => {
    let data = mails;
    selectedKey.forEach((num) => {
      data = data.map((elm) => {
        if (elm.id === num) {
          elm.label = label;
          return elm;
        } else return elm;
      });
    });
    setMails(data);
    setSelectedRowKeys([]);
  };

  //search
  // const [filteredMessages, setFilteredMessages] = useState([]);
  // useEffect(() => {
  //   setFilteredMessages(messages);
  // }, [messages]);

    //search
  const [filteredMessages, setFilteredMessages] = useState([]);
  useEffect(() => {
    setFilteredMessages(messages);
  }, [messages]);

  const search = (e) => {
    let query = e.target.value;
    let data = [];
    data = messages.filter((item) => {
      return query === "" ? item : item.firstName.toLowerCase().includes(query);
    });
    setFilteredMessages(data);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const locale = {
    emptyText: (
      <div className="text-center my-5">
        <img src="/img/others/img-10.png" alt="Add credit card" />
        <h3 className="mt-3 font-weight-light">There is no mail!</h3>
      </div>
    ),
  };

  function generateAvatar(username) {
    const avatar = createAvatar(initials, {
      seed: username,
      radius: 50,
      backgroundColor: [
        "00acc1",
        "5e35b1",
        "1e88e5",
        "d81b60",
        "e53935",
        "7cb342",
      ],
    }).toDataUriSync();
    return avatar;
  }

  //formater la date
  function formatShortDate(createdDate) {
    const [day, month, year] = createdDate.split("/");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthAbbreviation = months[parseInt(month, 10) - 1];
    return `${monthAbbreviation} ${day}`;
  }

  const columns = [
    {
      title: () => (
        <div className="mail-list-action">
          <div>
            {hasSelected ? (
              <div>
                <span
                  className="mail-list-action-icon"
                  onClick={() => {
                    massDeleted(selectedRowKeys);
                  }}
                >
                  <Tooltip title="Delete">
                    <DeleteOutlined />
                  </Tooltip>
                </span>
                <span
                  className="mail-list-action-icon"
                  onClick={() => {
                    massStar(selectedRowKeys);
                  }}
                >
                  <Tooltip title="Star">
                    <StarOutlined />
                  </Tooltip>
                </span>
              </div>
            ) : null}
          </div>
          <div>
            <Input
              size="small"
              placeholder={t("Search")}
              onChange={(e) => {
                search(e);
              }}
            />
          </div>
        </div>
      ),
      colSpan: 4,
      dataIndex: "name",
      className: "mail-list-sender",

      render: (_, elm) => (
        <div className="d-flex align-items-center">
          <div
            onClick={(e) => {
              e.stopPropagation();
              onStarTicked(elm);
            }}
            className={`mail-list-star font-size-md ${
              elm.starred ? "checked" : "uncheck"
            }`}
          >
            {elm.starred ? <StarFilled /> : <StarOutlined />}
          </div>
          <div className="d-flex align-items-center">
            <Avatar src={generateAvatar(elm.firstName)} size={30} />
            <h4 className="mb-0 ml-2">{elm.firstName}</h4>
          </div>
        </div>
      ),
    },

    {
      title: "",
      colSpan: 0,
      className: "mail-list-content",
      render: (_, elm) => (
        <div className=" mail-list-content-msg">
          <span className="font-weight-semibold text-dark ml-1">
            {elm.email}
          </span>
          <span className="mx-2"> - </span>
          <span className="p mb-0">{elm.message}</span>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "createdDate",
      colSpan: 0,
      className: "mail-list-date",
      render: (_, elm) => <div>{formatShortDate(elm.createdDate)}</div>,
    },
  ];
  const hasSelected = selectedRowKeys.length > 0;

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log("selectedRowKeys:", selectedRowKeys);
  //     console.log("selectedRows:", selectedRows);
  //   },
  //   // Add any other configuration as needed
  // };

  return (
    <div className="mail-list">
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredMessages}
        locale={locale}
        onRow={(elm) => {
          return {
            onClick: (e) => {
              e.preventDefault();
              navigate(`/app/messages/detail/${elm._id}`);
            },
          };
        }}
        rowKey="_id"
      />
    </div>
  );
};

export default MailItem;
