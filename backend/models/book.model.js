const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add title"],
    },
    author: {
      type: String,
      required: [true, "Please add author"],
    },
    publishedYear: {
      type: Number,
      required: [true, "Please add year of publish"],
    },
  },
  {
    timestamps: true,
  }
);

const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;
