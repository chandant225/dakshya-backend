const jwt = require("jsonwebtoken");
const { INTERNAL_SERVER } = require("../constants/Error");

const getRedirection = async (req, res, next) => {
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
        expiresIn: "1 days",
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
          `${process.env.FRONTEND_URL}/checkout?su=verified_success`
        );
      }
    );
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json(INTERNAL_SERVER);
  }
};

module.exports = { getRedirection };
