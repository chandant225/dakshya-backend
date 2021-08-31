const Admin = require("../models/admin_Schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SignUp = (req, res) => {
  const {
    admin_name,
    admin_email,
    admin_password,
    confirm_password,
  } = req.body;
  let errors = [];
  if (!admin_name || !admin_email || !admin_password || !confirm_password) {
    errors.push({ msg: "please enter all the fields" });
  }
  if (admin_password != confirm_password) {
    errors.push({ msg: "passwords do not match" });
  }
  if (admin_password.length < 6) {
    errors.push({ msg: "password must be atleast 6 characters" });
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  Admin.findOne({ email: admin_email })
    .then((admin_exist) => {
      if (admin_exist) {
        errors.push({
          msg: "admin already exist with this email,try with another one",
        });
        return res.status(400).json({ errors });
      } else {
        bcrypt
          .hash(admin_password, 12)
          .then((hashedPassword) => {
            const newadmin = new Admin({
              name: admin_name,
              email: admin_email,
              password: hashedPassword,
            });
            newadmin
              .save()
              .then((adminsaved) => {
                res.json({
                  msg: "you are successfully registered now,now you can login",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const SignIn = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ errors: "please enter all the fields" });
  }
  Admin.findOne({ email: email })
    .then((isadminfound) => {
      if (!isadminfound) {
        return res.status(400).json({
          error: "email or password may be invalid,please try again ",
        });
      }
      bcrypt
        .compare(password, isadminfound.password)
        .then((ismatched) => {
          if (ismatched) {
            const token = jwt.sign(
              { _id: isadminfound._id },
              process.env.JWT_SECRET
            );
            const { _id, name, email } = isadminfound;
            res
              .header("auth-token", token)
              .json({ token, admin: { _id, name, email } });
          } else {
            return res.status(400).json({
              error: "email or password may be invalid ,please try again",
            });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

module.exports = {
  SignUp,
  SignIn,
};
