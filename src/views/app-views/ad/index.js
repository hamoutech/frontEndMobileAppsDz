import React from "react";
import Button from "antd/es/button";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useLocation, Navigate, Route, Routes } from "react-router-dom";
import AdEdit from "./adEdit";
import AdAdd from "./adAdd";

const Ad = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="liste" replace />} />
      <Route path="edit/:id" element={<AdEdit />} />
      <Route path="ajouter" element={<AdAdd />} />
    </Routes>
  );
};

export default Ad;
