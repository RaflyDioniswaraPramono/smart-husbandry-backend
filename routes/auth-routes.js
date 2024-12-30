const router = require("express").Router();
const { signIn, signUp } = require("../controller/AuthController");

router.post("/auth/signin", signIn);
router.post("/auth/signup", signUp);

module.exports = router;
