import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Space, Table, Tag } from "antd";
import {
  showLoading,
  showAuthMessage,
  hideAuthMessage,
} from "store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

const columns = [
  {
    title: t("usersTable.usernameCol"),
    dataIndex: "username",
    key: "username",
    render: (text) => <a>{text}</a>,
  },
  {
    title: t("usersTable.emailCol"),
    dataIndex: "email",
    key: "email",
  },

  {
    title: t("usersTable.tagsCol"),
    key: "tags",
    dataIndex: "tags",
    render: () => (
      <>
        <Tag color="volcano">Admin</Tag>
      </>
    ),
  },
  {
    title: t("usersTable.actionsCol"),
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>
          {t("usersTable.actionsCol.edit")} {record.name}
        </a>
        <a>{t("usersTable.actionsCol.delete")}</a>
      </Space>
    ),
  },
];
export const UsersTable = (props) => {
  const navigate = useNavigate();
  const {
    hideAuthMessage,
    showLoading,
    token,
    loading,
    redirect,
    showMessage,
    message,
    allowRedirect = true,
  } = props;
  useEffect(() => {
    if (token !== null && allowRedirect) {
      //navigate(redirect);
      //window.location.reload();
 
    }
    if (showMessage) {
      const timer = setTimeout(() => hideAuthMessage(), 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [token]);
  return (
    <Table
      columns={columns}
      dataSource={props.usersData}
      rowKey={(record) => record.id}
    />
  );
};
const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  showAuthMessage,
  showLoading,
  hideAuthMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
