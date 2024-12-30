const bcrypt = require("bcryptjs")

const encrypt = (password) => {
  return bcrypt.hashSync(password, 12)
}

const decrypt = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
  encrypt,
  decrypt
}