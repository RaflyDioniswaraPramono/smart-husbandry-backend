const router = require("express").Router();
const { createPkb, getPkbs, deletePkb, updatePkb } = require("../controller/PkbController");

router.post("/pkb", createPkb);
router.get("/pkb", getPkbs);
router.put("/pkb/:id", updatePkb);
router.delete("/pkb/:id", deletePkb);

module.exports = router;
