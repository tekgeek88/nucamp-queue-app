const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

// Destructure the PORT and NODE_ENV variables from the process.env
// Give them default values if they don't exist
export const {
  PORT = process.env.PORT,
  NODE_ENV = process.env.NODE_ENV,
  databaseURL = process.env.MONGODB_URL,
  SESS_NAME = process.env.SESS_NAME,
  SESS_SECRET = process.env.SESS_SECRET,
  SESS_LIFETIME = process.env.SESS_LIFETIME,
} = process.env;
