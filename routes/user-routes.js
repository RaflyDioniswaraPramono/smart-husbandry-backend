const router = require("express").Router();
const {
  getUserInfo,
  getUserByUsername,
  deleteUser,
} = require("../controller/UserController");

router.get("/user/me", getUserInfo);
router.get("/user/:username", getUserByUsername);
router.delete("/user/:id", deleteUser);

module.exports = router;
