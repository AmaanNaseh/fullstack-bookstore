import React, { useState } from "react";
import axios from "axios";

import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

import { useNavigate } from "react-router-dom";

import { useSnackbar } from "notistack";

const CreateBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleSaveBook = async () => {
    const data = {
      title,
      author,
      publishedYear,
    };

    setIsLoading(true);

    await axios
      .post("http://localhost:5000/api/books", data)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar("Book created successfully !", { variant: "success" });
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
      <h1 className="text-3xl my-4">Create Book</h1>
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
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBookPage;
