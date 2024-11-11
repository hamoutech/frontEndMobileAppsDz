import { useState } from "react";
import { Drawer, Avatar, Divider, Button, Badge, Space } from "antd";
import {
  UserOutlined,
  MobileOutlined,
  MailOutlined,
  UserSwitchOutlined,
  TeamOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { t } from "i18next";
import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";

const MatchView = ({ data, visible, close }) => {
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
  const dateStr = data?.date;
  const dateObj = new Date(dateStr);
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);

  const hourStr = data?.hour;
  const hourObj = new Date(hourStr);
  const heure = hourObj.getHours();
  const minutes = hourObj.getMinutes();
  // Formater l'heure
  const formattedTime = `${heure}:${minutes < 10 ? "0" : ""}${minutes}`;
  return (
    <Drawer
      width={300}
      placement="right"
      onClose={close}
      closable={false}
      open={visible}
    >
      <div className="text-center mt-3">
        {/* <Avatar size={60} src={generateAvatar(data?.fullName)} /> */}
        <h3 className="mt-2 mb-0">{`${data?.titled}`}</h3>
      </div>
      <Divider dashed />
      <div className="">
        <h6 className="text-muted text-uppercase mb-3">{t("More details")}</h6>
        {/* <p>
        <CalendarOutlined />
          <span className="ml-3 text-dark">{t("Added on")} : {formattedDate}</span>
        </p> */}
        {/* <p>
        <CalendarOutlined />
          <span className="ml-3 text-dark">
         {t("newslist.table.newsCell")} : {data?.titled}
          </span>
        </p> */}

        <p>
          <TeamOutlined />
          <span className="ml-3 text-dark">
            {t("Stadium name")}: {data?.stadiumName}
          </span>
        </p>

        <p>
          <TeamOutlined />
          <span className="ml-3 text-dark">
            {t("match.competition")}: {data?.competition}
          </span>
        </p>

        <p>
          <TeamOutlined />
          <span className="ml-3 text-dark">
            {t("Stadium name")}: {data?.stadiumName}
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
            {t("date")} du match: {formattedDate}
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
            {t("From")}: {hourStr}
          </span>
        </p>
        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
            {t("register.username2Palceholder")} : {data?.myClubName}
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
            {t("Nombre de buts")} : {data?.myClubResult}
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
            {t("register.usernamePalceholder")} adversaire:{" "}
            {data?.nameAdversary}
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
            {t("Nombre de buts")} adversaire: {data?.resultAdversary}
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
            {t("Guard")} : {data?.goalkeeper}
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
            {t("Defender")} : {data?.defender}
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
            {t("forward")} : {data?.attacker}
          </span>
        </p>

        <p>
          <CalendarOutlined />
          <span className="ml-3 text-dark">
            {t("midfielder")} : {data?.midfielder}
          </span>
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

export default MatchView;
