const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "SendinBlue",
  auth: {
    user: "nabin.thapa@dakshyanepal.com",
    pass: "PkSvVyRhAYJUpzxT",
  },
});

module.exports = transporter;
