#!/usr/bin/env node
import path from "path";
import express from "express";
const createDatabase = require("./database/createDatabase").createDb;
const http = require('http');
createDatabase()
  .then(() => {
    const app = require('./app');

    if (process.env.NODE_ENV === "production") {
      app.use(express.static('client/build'));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
      });
    }

    const server = http.createServer(app);

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Listening on: ${PORT}`));

  })
  .catch(err => {
    console.log("Error starting server: " + err)
  });

console.log("Index.js is finished!");

