const express = require("express");
const mongoose = require("mongoose");
const { mongodbURL, PORT } = require("./configs/configurations");
const path = require("path");
const cors = require("cors");
const app = express();
const passport = require("passport");
const product_Route = require("./routes/productRoute");
const authRoute = require("./routes/authRoute");

// Necessary middlewares
require("dotenv").config();
require("./middlewares/passportGoogleStratgy")();
require("./middlewares/passportFbStrategy")();

// Mongoose connection
mongoose
  .connect(mongodbURL, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("mongodb connection failed");
  });

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport authenticated session persistence.
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use("/api/product", product_Route);
app.use("", authRoute);
