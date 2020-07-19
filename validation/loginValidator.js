const Validator = require("validator");
const isEmpty = require("is-empty");
import User from '../database/schemas/user'

export default async function validateLoginInput(data) {
  let errors = [];
  let user = null;

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.push({"email": "Email field is required"});
  } else if (!Validator.isEmail(data.email)) {
    errors.push({"email": "Email is invalid"});
  } else {
    user = await User.findOne({"email": data.email});
    if (!user) {
      errors.push({"email": "Email address not found"});
    }
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.push({"password": "Password field is required"});
  }
  if (user && !user.comparePasswords(data.password)) {
    errors.push({"password": "Password was incorrect"})
  }

  return {
    errors
  };
}