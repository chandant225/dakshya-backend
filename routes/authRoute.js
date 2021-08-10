const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getRedirection } = require("../controllers/authController");

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
  getRedirection
);

module.exports = router;
