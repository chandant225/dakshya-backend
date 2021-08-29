const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getRedirection } = require("../controllers/authController");

let redirect = true;

// @Route ==> /v1/dakshya/login/facebook
// @Method ==> GET
// @Type ==> Public
router.get(
  "/login/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile", "user_location"],
  })
);

// @Route ==> /v1/dakshya/facebook/callback
// @Method ==> GET
// @Type ==> Public

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  getRedirection
);

// @Route ==> /v1/dakshya/login/google
// @Method ==> GET
// @Type ==> Public

router.get(
  "/login/google",
  (req, res, next) => {
    console.log(req);
    redirect = req._parsedUrl.query !== null ? false : true;
    console.log(redirect, "from router ===============================");
    next();
  },
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

// @Route ==> /v1/dakshya/google/callback
// @Method ==> GET
// @Type ==> Public

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res, next) => {
    console.log(redirect, "===================== from callback");
    getRedirection(req, res, next, redirect);
  }
);

module.exports = router;
