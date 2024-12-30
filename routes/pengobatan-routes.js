const router = require("express").Router();
const {
	createPengobatan,
	getPengobatans,
	deletePengobatan,
	updatePengobatan,
} = require("../controller/PengobatanController");

router.post("/pengobatan", createPengobatan);
router.get("/pengobatan", getPengobatans);
router.put("/pengobatan/:id", updatePengobatan);
router.delete("/pengobatan/:id", deletePengobatan);

module.exports = router;
