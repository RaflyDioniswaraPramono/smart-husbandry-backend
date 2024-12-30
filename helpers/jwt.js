require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (payloads) => {
  const { id, username } = payloads;

  return jwt.sign(
    {
      id,
      username,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};

const verifyToken = (token) => {
  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

  return id;
};

module.exports = {
  generateToken,
  verifyToken,
};
