const router = require("express").Router();
const {
	createJenisHewans,
	getJenisHewans,
	updateJenisHewans,
	deleteJenisHewans,
} = require("../controller/JenisHewanController");

router.post("/jenis-hewan", createJenisHewans);
router.get("/jenis-hewan", getJenisHewans);
router.put("/jenis-hewan/:id", updateJenisHewans);
router.delete("/jenis-hewan/:id", deleteJenisHewans);

module.exports = router;
