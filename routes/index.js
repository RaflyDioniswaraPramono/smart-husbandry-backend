const router = require("express").Router();
const authRoutes = require("./auth-routes");
const userRoutes = require("./user-routes");
const petugasRoutes = require("./petugas-routes");
const peternakRoutes = require("./peternak-routes");
const kandangRoutes = require("./kandang-routes");
const hewanRoutes = require("./hewan-routes");
const pekerjaanRoutes = require("./pekerjaan-routes");
const jenisHewanRoutes = require("./jenis-hewan-routes");
const vaksinRoutes = require("./vaksin-routes");
const inseminasiRoutes = require("./inseminasi-routes");
const kelahiranRoutes = require("./kelahiran-routes");
const pengobatanRoutes = require("./pengobatan-routes");
const pkbController = require("./pkb-routes");
const importRoutes = require("./import-routes");

router.get("/", (req, res) => {
	res.send("API is running well!");
});

router.get("/api", (req, res) => {
	res.send("API is running well!");
});

router.use("/api", authRoutes);
router.use("/api", userRoutes);
router.use("/api", petugasRoutes);
router.use("/api", peternakRoutes);
router.use("/api", kandangRoutes);
router.use("/api", hewanRoutes);
router.use("/api", pekerjaanRoutes);
router.use("/api", jenisHewanRoutes);
router.use("/api", vaksinRoutes);
router.use("/api", inseminasiRoutes);
router.use("/api", kelahiranRoutes);
router.use("/api", pengobatanRoutes);
router.use("/api", pkbController);
router.use("/api", importRoutes);

module.exports = router;
