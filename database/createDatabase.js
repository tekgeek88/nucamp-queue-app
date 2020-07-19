import mongoose from 'mongoose';
import { databaseURL } from "../config/config";

async function createDb() {
  await mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return mongoose;
}

// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection has been opened');
});

mongoose.connection.on('error', err => {
  console.log('Mongoose default connection error: ' + err)
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// If the express server is shut down close the connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports.createDb = createDb;

