const express = require("express");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
// Routes
const Constants = require("../constants/Constants");
const product_Route = require("../routes/productRoute");
const authRoute = require("../routes/authRoute");
const reviewRoute = require("../routes/reviewRoute");
const paymentRoute = require("../routes/paymentRoute");
const adminRoute = require("../routes/adminRoute");
const suscriberRoute = require("../routes/suscribeRoute");
const couponRoute = require("../routes/couponRoute");
const cookieParser = require("cookie-parser");

module.exports = (app) => {
  const { BASE, BASE_PATH } = Constants;
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  //   Regular routes
  app.use(BASE + BASE_PATH, authRoute);
  app.use(BASE + BASE_PATH, product_Route);
  app.use(BASE + BASE_PATH, reviewRoute);
  app.use(BASE + BASE_PATH, paymentRoute);
  app.use(BASE + BASE_PATH, adminRoute);
  app.use(BASE + BASE_PATH, suscriberRoute);
  app.use(BASE + BASE_PATH, couponRoute);
};
