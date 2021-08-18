const express = require("express");
const app = express();
const path = require("path");
const startUpRoutes = require("./startup-routes/startUpRoutes");

// Necessary middlewares
require("dotenv").config();
require("./middlewares/passportGoogleStratgy")();
require("./middlewares/passportFbStrategy")();
require("./startup-routes/startUpDatabase")(app);

// Route startup
startUpRoutes(app);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
