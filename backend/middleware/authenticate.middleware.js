const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded_token = jwt.verify(token, "secret");
      if (decoded_token) {
        const userId = decoded_token.userId;
        req.body.userId = userId;
        next();
      } else {
        res.status(401).send({ msg: "Please login first!" });
      }
    } catch (err) {
      res.status(401).send({ msg: "Invalid Token. Please Login!", err });
    }
  } else {
    res.status(401).send({ msg: "User token not found. Login First." });
  }
};

module.exports = { authenticate };
