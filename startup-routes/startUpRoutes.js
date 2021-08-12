const express = require("express");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
// Routes
const Constants = require("../constants/Constants");
const product_Route = require("../routes/productRoute");
const authRoute = require("../routes/authRoute");

module.exports = (app) => {
  const { BASE, BASE_PATH } = Constants;
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
 
  app.use(passport.initialize());
  app.use(passport.session());
  //   Regular routes
  app.use(BASE + BASE_PATH, authRoute);
  app.use(BASE + BASE_PATH, product_Route);
};
