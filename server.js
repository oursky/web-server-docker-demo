"use strict";

const express = require("express");

const PORT = 8080;
const HOST = "0.0.0.0";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("You have reached the root of the server");
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
