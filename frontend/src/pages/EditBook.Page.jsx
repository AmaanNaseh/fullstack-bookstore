import React, { useState, useEffect } from "react";
import axios from "axios";

import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

import { useNavigate, useParams } from "react-router-dom";

import { useSnackbar } from "notistack";

const EditBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();
  const navigate = useNavigate();

  const getBook = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:5000/api/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishedYear(res.data.publishedYear);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        alert("An error occured ! Please check Console");
      });
  };

  useEffect(() => {
    getBook();
  }, []);

  const handleEditBook = async () => {
    const data = {
      title,
      author,
      publishedYear,
    };

    setIsLoading(true);

    await axios
      .put(`http://localhost:5000/api/books/${id}`, data)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar("Book edited successfully !", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        // alert("An error occured, please check console");
        enqueueSnackbar("Error !!!", { variant: "error" });
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {isLoading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl md:w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBookPage;
