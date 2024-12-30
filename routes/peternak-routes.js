const router = require("express").Router();
const {
	addPeternak,
	getPeternaks,
	getPeternakById,
	editPeternak,
	deletePeternak,
} = require("../controller/PeternakController");

router.post("/peternak", addPeternak);
router.get("/peternak", getPeternaks);
router.get("/peternak", getPeternakById);
router.put("/peternak/:id", editPeternak);
router.delete("/peternak/:nik_peternak", deletePeternak);

module.exports = router;
