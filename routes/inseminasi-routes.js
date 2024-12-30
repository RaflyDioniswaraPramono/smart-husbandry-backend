const router = require("express").Router();
const {
	getInseminasis,
	createInseminasi,
	deleteInseminasi,
	getInseminasiByPeternakAndHewanId,
	updateInseminasi,
} = require("../controller/InseminasiController");

router.post("/inseminasi", createInseminasi);
router.get("/inseminasi", getInseminasis);
router.get("/inseminasi/peternak/:peternak_id/hewan/:hewan_id", getInseminasiByPeternakAndHewanId);
router.put("/inseminasi/:id", updateInseminasi);
router.delete("/inseminasi/:id", deleteInseminasi);

module.exports = router;
