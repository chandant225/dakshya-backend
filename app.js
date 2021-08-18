const express = require("express");
const app = express();
const path = require("path");
const startUpRoutes = require("./startup-routes/startUpRoutes");
const session = require("express-session");

// Necessary middlewares
require("dotenv").config();
require("./middlewares/passportGoogleStratgy")();
require("./middlewares/passportFbStrategy")();
require("./startup-routes/startUpDatabase")(app);

// Route startup
startUpRoutes(app);
// session for express
app.use(
  session({
    secret: "something",
    cookie: {
      path: "/",
      domain: "shop.dakshyanepal.com",
    },
  })
);
// accept cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
