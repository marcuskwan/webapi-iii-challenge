const express = require("express");

const router = express.Router();

// db var requiring userDb
const db = require("./userDb");

// POST
// create new user
router.post("/", (req, res) => {
  const newUser = req.body;
  db.insert(newUser)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error: "Couldn't create user" }));
});

router.post("/:id/posts", (req, res) => {});

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
router.get("/:id/posts", (req, res) => {
  const userId = req.params.id;
  db.getUserPosts(userId)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(400).json({ error: "Couldn't retrieve posts" }));
});

//DELETE
// delete a specific user, returns the deleted user object || object with no. of users deleted ?
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(deletedId => res.status(200).json(deletedId))
    .catch(err => res.status(400).json({ error: "Couldn't delete user" }));
});

//PUT
// updates a specific user, returns the updated user object ?
router.put("/:id", validateUserId, (req, res) => {
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
  if (user && user.name) {
    next();
  } else {
    res.status(404).json({ message: "Please input a name" });
  }
}

function validatePost(req, res, next) {
  
}

module.exports = router;
