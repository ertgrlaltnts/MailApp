const jwt = require("jsonwebtoken");

const createJWT = (_id) => {
  return jwt.sign({ _id: _id }, "taskprivatekey");
};

module.exports = createJWT;
