import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LiveAdd from "./liveApplicationAdd";
import LiveEdit from "./liveApplicationEdit";

const Lists = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="liste" replace />} />
      <Route path="edit/:id" element={<LiveEdit />} />
      <Route path="add" element={<LiveAdd />} />
    </Routes>
  );
};

export default Lists;
