const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "SendinBlue",
  auth: {
    user: "info@dakshyanepal.com",
    pass: "CGrNLBfTjhWcPR3t",
  },
});

module.exports = transporter;
