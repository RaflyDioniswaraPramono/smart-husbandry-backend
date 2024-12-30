const router = require("express").Router();
const {
	createKandangWithPhoto,
	createKandangWithoutPhoto,
	getKandangs,
	deleteKandang,
	getKandangByPeternak,
	updateKandangWithoutPhoto,
	updateKandangWithPhoto,
} = require("../controller/KandangController");
const { upload } = require("../middlewares/multer");

router.post("/kandang/photo/include", upload.single("foto_kandang"), createKandangWithPhoto);
router.post("/kandang/photo/exclude", createKandangWithoutPhoto);
router.get("/kandang", getKandangs);
router.get("/kandang/peternak/:id", getKandangByPeternak);
router.put("/kandang/:id/photo/include", upload.single("foto_kandang"), updateKandangWithPhoto);
router.put("/kandang/:id/photo/exclude", updateKandangWithoutPhoto);
router.delete("/kandang/:id", deleteKandang);

module.exports = router;
