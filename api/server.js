const express = require("express");

// logger
const morgan = require("morgan");
// http
const helmet = require("helmet");
// cors
const cors = require("cors");

const server = express();

// use json
server.use(express.json());

// require the 2 routes
const userRoutes = require("./users/userRouter");
const postRoutes = require("./posts/postRouter");

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {}

// base url
server.use(morgan("dev"));
server.use(helmet());
server.use(cors());
server.use("/users", userRoutes);
server.use("/posts", postRoutes);

module.exports = server;
