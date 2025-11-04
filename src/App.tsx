import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestPage from "./pages/Quest";
import React from "react";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/quest/:id" element={<QuestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
