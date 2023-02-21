require("dotenv").config();

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

const projectName = "Museums";

app.locals.appTitle = `${projectName}`;

require('./config/session.config')

require('./routes')(app)

require("./error-handling")(app);

module.exports = app;
