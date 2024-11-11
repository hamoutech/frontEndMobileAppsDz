import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import MatchAdd from "./matchApplicationAdd";
import MatchEdit from "./matchApplicationEdit";


const Jobs = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="liste" replace />} />
      <Route path="edit/:id" element={<MatchEdit />} />
      <Route path="add" element={<MatchAdd />} />
      
    </Routes>
  );
};

export default Jobs;
