import User from "../database/schemas/user";
const Validator = require("validator");
const isEmpty = require('is-empty');

export default async function validateSignupInput(data) {
  // Errors to be returned to the front end
  let errors = [];

  // Prevent errors. Validator requires all input types to be strings
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name Checks
  if (Validator.isEmpty(data.firstname)) {
    errors.push({"firstname": "Firstname field is required"});
  }
  if (Validator.isEmpty(data.lastname)) {
    errors.push({"lastname": "Lastname field is required"});
  }

  // Email Checks
  const user = await User.findOne({ email: data.email });
  if (user) {
    errors.push({"email": "Email already exists"});
  }
  if (Validator.isEmpty(data.email)) {
    errors.push({"email": "Email is required"});
  } else if (!Validator.isEmail(data.email)) {
      errors.push({"email": "Email address invalid"});
  }

  // Password Checks
  if (Validator.isEmpty(data.password)) {
    errors.push({"password": "Password field is required"});
  }
  if (Validator.isEmpty(data.password2)) {
    errors.push({"password2": "Confirm password field is required"});
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.push({"password2": "Passwords must match"});
  }

  return {
    errors
  }

}