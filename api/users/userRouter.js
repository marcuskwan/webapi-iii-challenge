const express = require("express");

const router = express.Router();

// db var requiring userDb
const db = require("./userDb");
const postDb = require("../posts/postDb.js");

// POST
// create new user
router.post("/", (req, res) => {
  const newUser = req.body;
  db.insert(newUser)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error: "Couldn't create user" }));
});

// add new post , returns the new post object with an added id
router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const user_id = req.params.id;
  const { text } = req.body;
  const post = {
    user_id: `${user_id}`,
    text: `${text}`,
  };
  postDb
    .insert(post)
    .then(post => res.status(200).json(post))
    .catch(err =>
      res.status(400).json({ message: "Couldn't create new post" }),
    );
});

// GET
// get an array of all users
router.get("/", (req, res) => {
  db.get()
    // returns an array of user objects
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error: "Couldn't retrieve users" }));
});
// get an specific user, returns specific user (object) ?
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  // getById accepts a userId and returns a userObject
  db.getById(userId)
    // return the userObjects
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error: "Failed to retrieve user" }));
});
// get specific user posts,
router.get("/:id/posts", validateUserId, (req, res) => {
  const userId = req.params.id;
  db.getUserPosts(userId)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(400).json({ error: "Couldn't retrieve posts" }));
});

//DELETE
// delete a specific user, returns the deleted user object || object with no. of users deleted ?
router.delete("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(deletedId => res.status(200).json(deletedId))
    .catch(err => res.status(400).json({ error: "Couldn't delete user" }));
});

//PUT
// updates a specific user, returns the updated user object ?
router.put("/:id", validateUserId, validateUser, (req, res) => {
  const updatedInfo = req.body;
  const id = req.params.id;
  db.update(id, updatedInfo)
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(err => res.status(400).json({ error: "Couldn't update user" }));
});

//custom middleware

function validateUserId(req, res, next) {
  const userId = req.params.id;
  db.getById(userId)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404).json({ message: "No user returned" });
      }
    })
    .catch(err => res.status(500).json({ error: "Failed to get user" }));
}

function validateUser(req, res, next) {
  let user = req.body;
  console.log("req.body", req.body);
  if (user && user.name) {
    next();
  } else {
    res.status(404).json({ message: "Please input a name" });
  }
}

function validatePost(req, res, next) {
  const body = req.body;
  if (body && body.text) {
    next();
  } else {
    res.status(404).json({ message: "Please input text" });
  }
}

module.exports = router;
