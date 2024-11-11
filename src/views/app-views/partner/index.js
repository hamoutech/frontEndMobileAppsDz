import React from "react";
import Button from "antd/es/button";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useLocation, Navigate, Route, Routes } from "react-router-dom";
import PartnerEdit from "./partnerEdit";
import PartnerAdd from "./partnerAdd";

const Partner = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="liste" replace />} />
      <Route path="edit/:id" element={<PartnerEdit />} />
      <Route path="ajouter" element={<PartnerAdd />} />
   
    </Routes>
  );
};

export default Partner;
