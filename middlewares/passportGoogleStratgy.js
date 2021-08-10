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
        callbackURL: "http://localhost:4040/google/callback",
        passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
        //Check the DB to find a User with the profile.id
        User.findOne({ google_id: profile.id }, function (err, user) {
          if (err) {
            console.log(err); // handle errors!
          }

          if (user) {
            done(null, user); //If User already exists login as stated on line 10 return User
          } else {
            //else create a new User
            user = new User({
              google_id: profile.id, //pass in the id and displayName params from Facebook
              name: profile.displayName,
              picture: profile.picture,
              email: profile.email,
              first_name: profile.first_name,
              last_name: profile.last_name,
            });
            user.save(function (err) {
              //Save User if there are no errors else redirect to login route
              if (err) {
                console.log(err); // handle errors!
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
