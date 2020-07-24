import express from 'express';
import isEmpty from "is-empty";
import validateLoginInput from '../../../validation/loginValidator'
import User from '../../../database/schemas/user'
import {sessionizeUser} from "../../../utils/session";
const router = express.Router({mergeParams: true});
/**
 * @method - POST
 * @description - Login user
 * @access Public
 */
router.post("/", async (req, res) => {
  try {
    const {email} = req.body;
    // Form validation
    const {errors} = await validateLoginInput(req.body);

    // Check validation
    if (!isEmpty(errors)) {

      return res.status(400).json({
        success: false,
        message: "validateLoginInput failed",
        errors
      });
    }

    // If the user was validated fetch it again
    // sessionize it and attach it to the req object
    // and send them home with a cookie
    const user = await User.findOne({email});
    const sessionUser = sessionizeUser(user);
    req.session.user = sessionUser;

    return res.status(200).json({
      success: true,
      user: sessionUser
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
      errors: []
    });
  }
});

module.exports = router;
