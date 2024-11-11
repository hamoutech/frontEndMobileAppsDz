import { useState } from "react";
import { Drawer, Avatar, Divider, Button, Badge, Space } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  MobileOutlined,
  MailOutlined,
  CompassOutlined,
  ManOutlined,
  WomanOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { t } from "i18next";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";

const  PlayerView = ({ data, visible, close }) => {
  const getBadgeColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "cyan";

      case "REFUSED":
        return "volcano";
      case "BLOCKED":
        return "red";
    }
  };

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
  const dateStr = data?.dateOfBirth;
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
        {/* <p>
          <UserOutlined />
          <span className="ml-3 text-dark">{t("Added on")} {data?.created_at}</span>
        </p> */}
        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
            {t("Born in")} :  {formattedDate}
          </span>
        </p>
        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
          {t("birthPlace")} :  {data?.  placeOfBirth}
          </span>
        </p>
      
        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
          {t("nationality")} :  {data?.nationality}
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
            Position :  {data?.position}
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
          {t("weight")} :  {data?.weight} kg
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
          {t("size")} :  {data?.size} m
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
          {t("atTheClubSince")} :  {data?.atTheClubSince} ans
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
          {t("Nombre de matchs")} :  {data?.numberOfMatches}
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
          {t("Nombre de buts")} :  {data?.numberOfGoals}
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
          {t("Nombre de passes decisif")}:  {data?.numberOfDecisivePasses}
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
          Nom du club précédent :  {data?.previousClubName}
          </span>
        </p>


        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
          Années du club précédent :  {data?.previousClubYears} ans
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
          Nombre de matchs du club précédent :  {data?.previousClubNumberOfMatches}
          </span>
        </p>

      

        
      
      </div>
      <div className="mt-5">
        <h6 className="text-muted text-uppercase mb-3">{t("CONTACT")}</h6>
        <p>
          <MobileOutlined />
          <span className="ml-3 text-dark">{data?.numberPhone}</span>
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

export default PlayerView;
