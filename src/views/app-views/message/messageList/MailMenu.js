import React from "react";
import { Menu, Button, Badge } from "antd";
import {
  InboxOutlined,
  FileTextOutlined,
  MailOutlined,
  StarOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MenuItem = ({ prefix, path, label, url }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/app/messages`)}>
      {prefix}
      <span>{label}</span>
    </div>
  );
};

export const MailMenu = (props) => {
  const { url } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const locationPath = location.pathname.split("/");

  const currentpath = locationPath[locationPath.length - 1];
  return (
    <div className="w-100">
      <div className="p-3">
        <Button
          type="primary"
          block
          onClick={() => navigate(`/app/messages/compose`)}
        >
          <EditOutlined />
          <span>Compose</span>
        </Button>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[currentpath]}
        items={[
          {
            key: "inbox",
            label: <MenuItem label="Inbox" prefix={<InboxOutlined />} />,
          },
          {
            key: "sent",
            label: (
              <MenuItem
                label="Sent"
                prefix={<MailOutlined />}
                path="sent"
                url={url}
              />
            ),
          },
          {
            key: "starred",
            label: (
              <MenuItem
                label="Starred"
                prefix={<StarOutlined />}
                path="starred"
                url={url}
              />
            ),
          },
          {
            key: "deleted",
            label: (
              <MenuItem
                label="Deleted"
                prefix={<DeleteOutlined />}
                path="deleted"
                url={url}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default MailMenu;
