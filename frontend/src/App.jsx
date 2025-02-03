import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBookPage from "./pages/createBook.page";
import HomePage from "./pages/Home.Page";
import EditBookPage from "./pages/EditBook.Page";
import DeleteBookPage from "./pages/DeleteBook.Page";
import ShowBookPage from "./pages/ShowBook.Page";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/create" element={<CreateBookPage />} />
        <Route path="/books/details/:id" element={<ShowBookPage />} />
        <Route path="/books/edit/:id" element={<EditBookPage />} />
        <Route path="/books/delete/:id" element={<DeleteBookPage />} />
      </Routes>
    </>
  );
};

export default App;
