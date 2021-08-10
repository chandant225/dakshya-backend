const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user_Schema");

module.exports = () => {
  // Google redirection
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_AUTH_ID,
        clientSecret: process.env.GOOGLE_AUTH_SECRET,
        callbackURL: "http://localhost:4040/v1/dakshyashop/google/callback",
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        User.findOne({ google_id: profile.id }, function (err, user) {
          if (err) {
            console.log(err);
          }

          if (user) {
            done(null, user);
          } else {
            user = new User({
              google_id: profile.id,
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
                console.log("saving user ...");
                done(null, user);
              }
            });
          }
        });
      }
    )
  );
};
