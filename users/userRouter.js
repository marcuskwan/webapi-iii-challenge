const express = require("express");

const router = express.Router();

// db var requiring userDb
const db = require("./userDb");

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {

});

router.get("/", (req, res) => {
  db.get()
    // returns an array of user objects
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error: "Couldn't retrieve users" }));
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  // getById accepts a userId and returns a userObject
  db.getById(userId)
    // return the userObjects
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error: "Failed to retrieve user" }));
});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
