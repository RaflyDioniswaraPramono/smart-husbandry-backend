const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/images");
	},
	filename: (req, file, cb) => {
		const uniqueSuffix =
			new Date(Date.now()).toLocaleString("id-ID", {
				weekday: "long",
				day: "2-digit",
				month: "long",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				timeZoneName: "short",
			}) +
			"-" +
			Math.round(Math.random() * 1e9);
		cb(null, `${uniqueSuffix}-${file.originalname}`);
	},
});

const fileFilter = (req, file, cb) => {
	const allowedExtensions = /jpeg|jpg|png|gif/;
	const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
	const mimetype = allowedExtensions.test(file.mimetype);

	if (extname && mimetype) {
		cb(null, true);
	} else {
		cb(new Error("Only images are allowed"));
	}
};

const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = { upload };
