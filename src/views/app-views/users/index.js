import React from "react";
import Button from "antd/es/button";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useLocation, Navigate, Route, Routes } from "react-router-dom";

import UserAdd from "./userAdd";

const Users = () => {
  // const location = useLocation();
  // const locationPath = location.pathname.split("/");
  // const currentpath = locationPath[locationPath.length - 1];
  return (
    <Routes>
      <Route path="*" element={<Navigate to="liste" replace />} />
      <Route path="ajouter" element={<UserAdd />} />
    </Routes>
  );
};

export default Users;
