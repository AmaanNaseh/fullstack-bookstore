const BookModel = require("../models/book.model.js");

/*
Route           /api/books
Description     Create new book
Access          Public
Param           NONE    
Method          POST
*/

const createBook = async (req, res) => {
  try {
    // const { book } = req.body;

    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      res.status(400).send("All fields are mandatory");
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
    }; // for axios integration in frontend

    const createdBook = await BookModel.create(newBook);

    return res.status(201).send(createdBook);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

/*
Route           /api/books
Description     Get all books
Access          Public
Param           NONE    
Method          GET
*/

const getBooks = async (req, res) => {
  try {
    const books = await BookModel.find();

    if (!books) {
      res.status(404).send({ msg: "Books not found" });
    }

    res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

/*
Route           /api/books/:id
Description     Get one book based on id
Access          Public
Param           id
Method          GET
*/

const getBook = async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);

    if (!book) {
      res.status(404).send({ msg: "Book not found" });
    }

    res.status(200).send(book);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

/*
Route           /api/books/:id
Description     Update a book based on id
Access          Public
Param           id
Method          UPDATE
*/

const updateBook = async (req, res) => {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      res.status(404).send("Book Not Found");
    }

    res.status(200).send({ msg: "Book updated successfully" });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await BookModel.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      res.status(404).send("Book Not Found");
    }

    res.status(200).send({ msg: "Book deleted successfully" });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
