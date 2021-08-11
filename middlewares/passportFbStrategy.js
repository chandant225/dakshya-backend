const passport = require("passport");
const Strategy = require("passport-facebook").Strategy;
const User = require("../models/user_Schema");

module.exports = () => {
  // Configure the Facebook strategy
  passport.use(
    new Strategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:4040/v1/dakshyashop/facebook/callback",
        profile: [
          "id",
          "displayName",
          "first_name",
          "last_name",
          "email",
          "public_profile",
          "user_location",
        ],
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOne({ facebook_id: profile.id }, function (err, user) {
          if (err) {
            console.log(err);
          }

          if (user) {
            done(null, user);
          } else {
            user = new User({
              facebook_id: profile.id,
              name: profile.displayName,
              picture: profile.picture,
              email: profile.email,
              first_name: profile.first_name,
              last_name: profile.last_name,
            });
            user.save(function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log("saving user with facebook info...");
                done(null, user);
              }
            });
          }
        });
      }
    )
  );
};
