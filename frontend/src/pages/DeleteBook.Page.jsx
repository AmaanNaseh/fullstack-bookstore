import React, { useState } from "react";
import axios from "axios";

import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

import { useNavigate, useParams } from "react-router-dom";

import { useSnackbar } from "notistack";

const DeleteBookPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = async () => {
    setIsLoading(true);

    await axios
      .delete(`http://localhost:5000/api/books/${id}`)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar("Book deleted successfully !", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        //alert("An error occured, please check console");
        enqueueSnackbar("Error !!!", { variant: "error" });
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {isLoading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl md:w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          Are you sure you want to delete this book ?
        </h3>

        <button
          onClick={handleDeleteBook}
          className="p-4 bg-red-600 text-white m-8 w-full"
        >
          Yes !!! Delete It
        </button>
      </div>
    </div>
  );
};

export default DeleteBookPage;
