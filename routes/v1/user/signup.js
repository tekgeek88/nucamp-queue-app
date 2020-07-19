import User from "../../../database/schemas/user";
import validateSignupInput from "../../../validation/signupValidator";
import isEmpty from "is-empty";
import {sessionizeUser} from "../../../utils/session";
const express = require('express');
const router = express.Router({mergeParams: true});


/* POST: Create a user */
router.post("/", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password
  } = req.body;

  // Form validation
  const {errors} = await validateSignupInput(req.body);

  if (!isEmpty(errors)) {
    return res.status(400).json({
      success: false,
      message: "validateSignupInput failed",
      errors
    });
  }

  const user = new User({
    firstname,
    lastname,
    email,
    password,
    role: "user"
  });

  const sessionUser = sessionizeUser(user);

  try {
    await user.save();
    // Attach the sessionized user to the request object so that we can access
    // the users info from any scope in our app and backend
    req.session.user = sessionUser;
    res.status(200).json({
      success: true,
      sessionUser
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to signup user!",
      err
    });
  }
});

module.exports = router;