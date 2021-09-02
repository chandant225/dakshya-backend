const jwt = require("jsonwebtoken");

module.exports = auth = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");
  // check if no Token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization failed" });
  }
  // Verify Token
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode.user;
    next();
  } catch (err) {
    res.status(401).json({ isLogin:false, message: "Token is not valid." });
  }
};
