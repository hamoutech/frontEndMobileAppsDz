import { useState } from "react";
import { Drawer, Avatar, Divider, Button, Badge, Space } from "antd";
import {
  UserOutlined,
  MobileOutlined,
  MailOutlined,
  UserSwitchOutlined,
  TeamOutlined
 
} from "@ant-design/icons";
import { t } from "i18next";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";

const StaffView = ({ data, visible, close }) => {


  const generateAvatar = (username) => {
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
  };
  const dateStr = data?.createdDate;
  const dateObj = new Date(dateStr);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('en-US', options);
  return (
    <Drawer
      width={300}
      placement="right"
      onClose={close}
      closable={false}
      open={visible}
    >
      <div className="text-center mt-3">
        <Avatar size={60} src={generateAvatar(data?.fullName)} />
        <h3 className="mt-2 mb-0">{`${data?.fullName}`}</h3>
        
      </div>
      <Divider dashed />
      <div className="">
        <h6 className="text-muted text-uppercase mb-3">{t("More details")}</h6>
        <p>
          <UserOutlined />
          <span className="ml-3 text-dark">{t("Added on")} : {formattedDate}</span>
        </p>
        <p>
        <UserSwitchOutlined />
          <span className="ml-3 text-dark">
          {t("Job")} : {data?.job}
          </span>
        </p>
     
        <p>
        <TeamOutlined />
          <span className="ml-3 text-dark">
          {t("staff.type")} : {data?.type}
          </span>
        </p>
      </div>
      <div className="mt-5">
        <h6 className="text-muted text-uppercase mb-3">{t("CONTACT")}</h6>
        <p>
          <MobileOutlined />
          <span className="ml-3 text-dark">{data?.numberPhone}</span>
        </p>
        <p>
          <MailOutlined />
          <span className="ml-3 text-dark">{data?.email}</span>
        </p>
    
      </div>
      <div style={{ textAlign: "center" }}>
        <Button type="primary" onClick={close}>
          {t("Close")}
        </Button>
      </div>
    </Drawer>
  );
};

export default StaffView;
