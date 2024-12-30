const router = require("express").Router();
const {
	createKelahirans,
	getKelahirans,
	deleteKelahirans,
	updateKelahiran,
} = require("../controller/KelahiranController");

router.post("/kelahiran", createKelahirans);
router.get("/kelahiran", getKelahirans);
router.put("/kelahiran/:id", updateKelahiran);
router.delete("/kelahiran/:id", deleteKelahirans);

module.exports = router;
