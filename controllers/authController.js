const jwt = require("jsonwebtoken");
const { INTERNAL_SERVER } = require("../constants/Error");

const getRedirection = function async(req, res, next, redirect) {
  const user = req.user;
  try {
    //   Creates payload and sends token to user
    const payload = {
      user: {
        uuid: user._id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "3 days",
      },
      (err, token) => {
        if (err) throw err;
        // req.session.token = token;
        // res.session.user = user;
        res.cookie("token", token, {
          domain: process.env.DOMAIN,
        });
        res.cookie("user", user, {
          domain: process.env.DOMAIN,
        });
        res.redirect(
          redirect
            ? `${process.env.FRONTEND_URL}/checkout?su=verified_success`
            : `${process.env.FRONTEND_URL}/login?su=success`
        );
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(INTERNAL_SERVER);
  }
};

module.exports = { getRedirection };
