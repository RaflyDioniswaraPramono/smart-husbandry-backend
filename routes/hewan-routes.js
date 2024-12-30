const router = require("express").Router();
const {
	createHewanWithPhoto,
	createHewanWithoutPhoto,
	updateHewanWithPhoto,
	updateHewanWithoutPhoto,
	getHewans,
	deleteHewan,
	getHewansByPeternak,
} = require("../controller/HewanController");
const { upload } = require("../middlewares/multer");

router.post("/hewan/photo/include", upload.single("foto_hewan"), createHewanWithPhoto);
router.post("/hewan/photo/exclude", createHewanWithoutPhoto);
router.get("/hewan", getHewans);
router.get("/hewan/peternak/:id", getHewansByPeternak);
router.put("/hewan/:id/photo/include", upload.single("foto_hewan"), updateHewanWithPhoto);
router.put("/hewan/:id/photo/exclude", updateHewanWithoutPhoto);
router.delete("/hewan/:id", deleteHewan);

module.exports = router;
