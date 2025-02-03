require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookRoute = require("./routes/book.route.js");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json()); // json request

// CORS Middleware
app.use(cors()); // method 1: to handle CORS Policy (allow all origins with default of cors(*))

app.use("/api/books", bookRoute); // routes

// Option 2 allow custom origin
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// Mongodb connection & Server setup
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server started running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Root route configuration
app.get("/", (req, res) => {
  res.send("Welcome to Backend of Book Store");
});
