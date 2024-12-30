const multer = require("multer");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./uploads/excel-files");
	},
	filename: (req, file, cb) => {
		cb(
			null,
			`${new Date(Date.now()).toLocaleString("id-ID", {
				weekday: "long",
				day: "2-digit",
				month: "long",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			})}-${file.originalname}`
		);
	},
});

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
			cb(null, true);
		} else {
			cb(new Error("File must be an Excel file (.xlsx)"), false);
		}
	},
});

module.exports = { upload };
