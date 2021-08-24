const jwt = require("jsonwebtoken");
const Admin = require("../models/admin_Schema");
function authenticate(req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .send({ message: "please login to visit this resource" });
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const { _id } = payload;
  Admin.findById(_id)
    .then((admindata) => {
      req.admin = admindata;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports.authenticate = authenticate;
