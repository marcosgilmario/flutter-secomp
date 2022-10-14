const express = require("express");

const auth = require("./routerAuth");
const users = require("./routerUsers");

const app = express();

app.use(auth);
app.use(users);

module.exports = app;
