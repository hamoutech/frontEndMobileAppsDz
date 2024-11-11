import React from "react";
import Button from "antd/es/button";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useLocation, Navigate, Route, Routes } from "react-router-dom";
import NewsEdit from "./newsEdit";
import NewsAdd from "./newsAdd";

const News = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="liste" replace />} />
      <Route path="edit/:id" element={<NewsEdit />} />
      <Route path="ajouter" element={<NewsAdd />} />
   
    </Routes>
  );
};

export default News;
