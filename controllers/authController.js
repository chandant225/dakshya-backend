const User = require("../models/user_Schema");

// export const Fb_Login = async (req, res) => {
//   try {
//   } catch (err) {}
// };

const getRedirection = async (req, res) => {
  res.redirect("/checkout");
};

module.exports = { getRedirection };
