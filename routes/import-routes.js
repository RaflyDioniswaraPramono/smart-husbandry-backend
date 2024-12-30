const router = require("express").Router();
const {
	importAllData,
	importPetugas,
	importPeternak,
	importJenisHewan,
	importKandang,
	importHewan,
	importVaksin,
	importInseminasi,
	importKelahiran,
	importPengobatan,
	importPkb,
} = require("../controller/ImportController");
const { upload } = require("../middlewares/multer-excel");

router.post("/import/all", upload.single("all_data_excel"), importAllData);
router.post("/import/petugas", upload.single("petugas_excel"), importPetugas);
router.post("/import/peternak", upload.single("peternak_excel"), importPeternak);
router.post("/import/jenis-hewan", upload.single("jenis_hewan_excel"), importJenisHewan);
router.post("/import/kandang", upload.single("kandang_excel"), importKandang);
router.post("/import/hewan", upload.single("hewan_excel"), importHewan);
router.post("/import/vaksin", upload.single("vaksin_excel"), importVaksin);
router.post("/import/inseminasi", upload.single("inseminasi_excel"), importInseminasi);
router.post("/import/kelahiran", upload.single("kelahiran_excel"), importKelahiran);
router.post("/import/pengobatan", upload.single("pengobatan_excel"), importPengobatan);
router.post("/import/pkb", upload.single("pkb_excel"), importPkb);

module.exports = router;
