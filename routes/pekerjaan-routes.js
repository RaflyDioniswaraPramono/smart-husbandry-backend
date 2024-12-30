const router = require("express").Router();
const { getAllPekerjaan } = require("../controller/PekerjaanController");

router.get("/pekerjaan", getAllPekerjaan);

module.exports = router;
