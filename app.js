const express = require("express");
const app = express();

const startUpRoutes = require("./startup-routes/startUpRoutes");

// Necessary middlewares
require("dotenv").config();
require("./middlewares/passportGoogleStratgy")();
require("./middlewares/passportFbStrategy")();
require("./startup-routes/startUpDatabase")(app);

// Route startup
startUpRoutes(app);
