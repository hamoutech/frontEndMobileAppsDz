import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import CardEdit from "./cardEdit"
import CardAdd from "./cardAdd"

const Jobs = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="list" replace />} />
      <Route path="edit/:id" element={<CardEdit />} />
      <Route path="add" element={<CardAdd />} />
    </Routes>
  )
}

export default Jobs
