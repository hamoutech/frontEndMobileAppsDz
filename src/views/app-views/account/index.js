import React, { Component } from "react";
import {
  UserOutlined,
  LockOutlined,
  CreditCardOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, Route, Navigate, useLocation, Routes } from "react-router-dom";
import InnerAppLayout from "layouts/inner-app-layout";
import ChangePasswordForm from "./changePassword/changePassword";
import ManageAccount from "./manageAccount";
import {t} from "i18next"

const url = "/app/mon_compte";

const MenuItem = ({ icon, path, label }) => {
  return (
    <>
      {icon}
      <span>{label}</span>
      <Link to={`${url}/${path}`} />
    </>
  );
};

const SettingOption = () => {
  const location = useLocation();

  const locationPath = location.pathname.split("/");

  const currentpath = locationPath[locationPath.length - 1];

  return (
    <Menu
      mode="inline"
      selectedKeys={[currentpath]}
      items={[
        {
          key: "edit-profile",
          label: (
            <MenuItem
              label={t("Manage account")}
              // icon={<UserOutlined />}
              path="gerer_compte"
            />
          ),
        },
        {
          key: "change-password",
          label: (
            <MenuItem
              label={t("Change Password")}
              icon={<LockOutlined />}
              path="changer_mot_de_passe"
            />
          ),
        },
      ]}
    />
  );
};

const SettingContent = () => {
  return (
    <Routes>
      <Route path="gerer_compte" element={<ManageAccount />} />
      <Route path="changer_mot_de_passe" element={<ChangePasswordForm />} />
      <Route path="*" element={<Navigate to="gerer_compte" replace />} />
    </Routes>
  );
};

export class Account extends Component {
  render() {
    return (
      <InnerAppLayout
        sideContentWidth={320}
        sideContent={<SettingOption />}
        mainContent={<SettingContent />}
      />
    );
  }
}

export default Account;
