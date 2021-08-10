const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getRedirection } = require("../controllers/authController");

router.get(
  "/login/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile", "user_location"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  getRedirection
);

router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  getRedirection
);

module.exports = router;
