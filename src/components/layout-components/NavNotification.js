import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import { Badge, Avatar, List, Button, Popover } from "antd";
import {
  MailOutlined,
  BellOutlined,
  WarningOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import notificationData from "assets/data/notification.data.json";
import Flex from "components/shared-components/Flex";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const GetNotificationBody = ({ data }) => {
  const navigate = useNavigate();

  return data.length > 0 ? (
    <List
      size="small"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          className="list-clickable"
          onClick={() => {
            if (item.type === "signalement parent") {
              navigate(`app/signalement/parent/${item.id}`);
            }
            if (item.type === "signalement gardien") {
              navigate(`app/signalement/gardien/${item.id}`);
            }
          }}
        >
          <Flex alignItems="center">
            <div className="pr-3">
              <Avatar
                className={
                  item.type === "Signalement"
                    ? `ant-avatar-danger`
                    : `ant-avatar-info`
                }
                icon={<NotificationOutlined />}
              />
            </div>
            <div className="mr-3">
              <span className=" text-dark">{item.message}</span>
            </div>

            <small className="ml-auto text-muted">{item.hour}</small>
          </Flex>
        </List.Item>
      )}
    />
  ) : (
    <div className="empty-notification">
      <img
        src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
        alt="empty"
      />
      <p className="mt-3">{t("You have viewed all notifications")}</p>
    </div>
  );
};

export const NavNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Retrieve notifications from local storage on component mount
    const storedNotifications = JSON.parse(
      localStorage.getItem("notifications")
    );
    if (storedNotifications) {
      setNotifications(storedNotifications);
    }

    const socket = io("https://backend.mobile-apps-dz.com");
    socket.on("Notifications", (message) => {
      const updatedNotifications = [...notifications, message];
      setNotifications(updatedNotifications);

      localStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  };

  const notificationList = (
    <div>
      <div className="nav-notification-header d-flex justify-content-between align-items-center">
        <h4 className="mb-0">{t("Notifications")}</h4>
        <Button
          className="text-primary"
          type="text"
          onClick={clearNotifications}
          size="small"
        >
          {t("Clear")}
        </Button>
      </div>
      <div className="nav-notification-body">
        <GetNotificationBody data={notifications} />
      </div>
    </div>
  );

  return (
    <Popover
      placement="bottomRight"
      title={null}
      content={notificationList}
      trigger="click"
      overlayClassName="nav-notification"
    >
      <div className="nav-item">
        <Badge count={notifications.length}>
          <BellOutlined className="nav-icon mx-auto" type="bell" />
        </Badge>
      </div>
    </Popover>
  );
};

export default NavNotification;
