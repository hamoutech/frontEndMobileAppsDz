import React from "react";
import { Link, useLocation, Navigate, Route, Routes } from "react-router-dom";
import PlayerAdd from "./playerAdd";
import PlayerEdit from "./playerEdit";

const Players = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="liste" replace />} />
      <Route path="ajouter" element={<PlayerAdd/>} />
      <Route path="modifier/:id" element={<PlayerEdit />} />
    </Routes>
  );
};

export default Players;
