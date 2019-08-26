"use strict";

const express = require("express");
const mongoose = require("mongoose");

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();

const mongoDBUrl = process.env.MONGO_DB_URL;

mongoose.connect(mongoDBUrl, { useNewUrlParser: true });

const Todo = mongoose.model("Todo", {
  name: String,
  value: String,
  createdAt: Date
});

app.use(express.json());

app.get("/", (_, res) => {
  res.send("You have reached the root of the server");
});

app.post("/new_todo", (req, res) => {
  if (req.body.name && req.body.value) {
    const { name, value } = req.body;
    const todo = new Todo({ name, value, createdAt: new Date() });

    todo
      .save()
      .then(() => res.send(`saved Todo with name ${name}`))
      .catch(err => res.send(`failed to save, err: `, err));
  } else {
    return res.send("your request payload is invalid");
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
