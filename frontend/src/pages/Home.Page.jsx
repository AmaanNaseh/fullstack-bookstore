import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

import { MdOutlineAddBox } from "react-icons/md";

import axios from "axios";
import { backend_API } from "../config/config";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [showType, setShowType] = useState("table");

  const [isLoading, setIsLoading] = useState(false);

  const getBooks = async () => {
    setIsLoading(true);
    await axios
      .get(`${backend_API}/api/books`)
      .then((res) => {
        setBooks(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => {
            setShowType("table");
          }}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => {
            setShowType("card");
          }}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to={"/books/create"}>
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>

      {isLoading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}

      <a
        href="https://www.flaticon.com/free-icon/bookstore_5900097?term=bookshop&page=1&position=1&origin=search&related_id=5900097"
        target="_blank"
        rel="noreferrer"
        className="m-20 flex items-center justify-center"
      >
        Favicon by Surang
      </a>
    </div>
  );
};

export default HomePage;
