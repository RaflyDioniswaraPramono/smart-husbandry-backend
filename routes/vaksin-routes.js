const router = require("express").Router();
const {
	createVaksin,
	getVaksins,
	deleteVaksin,
	updateVaksin,
	getVaksinsByPeternakId,
} = require("../controller/VaksinController");

router.post("/vaksin", createVaksin);
router.get("/vaksin", getVaksins);
router.get("/vaksin/peternak/:id", getVaksinsByPeternakId);
router.put("/vaksin/:id", updateVaksin);
router.delete("/vaksin/:id", deleteVaksin);

module.exports = router;
