import React from "react";
import "./App.css";
import BookPage from "../BooksPage";
import UserPage from "../UsersPage";
import Menu from "../Menu";
import Login from "../Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function Index() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="books" element={<Menu content={<BookPage />} />} />
          <Route path="users" element={<Menu content={<UserPage />} />} />
          <Route path="login" element={<Login />} />
          <Route path="/*" element={<Navigate to="login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Index;
