import User from "../../../database/schemas/user";
const express = require('express');
const router = express.Router({mergeParams: true});

/* POST: Create a user */
router.post("/", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    password2,
    role
  } = req.body;

  const user = new User({
    firstname,
    lastname,
    email,
    password,
    password2,
    role
  });
  await user.save();
  res.status(200).json(user);
});

module.exports = router;