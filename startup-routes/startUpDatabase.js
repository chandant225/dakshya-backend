const mongoose = require("mongoose");
const { mongodbURL, PORT } = require("../configs/configurations");
const passport = require("passport");
module.exports = (app) => {
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
  // Configure Passport authenticated session persistence.
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
};
