import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import MessageAdd from "./messageApplicationAdd";
// import MessageEdit from "./messageApplicationEdit";

const Lists = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="liste" replace />} />
      {/* <Route path="edit/:id" element={<MessageEdit />} />
      <Route path="add" element={<MessageAdd />} /> */}
    </Routes>
  );
};

export default Lists;
