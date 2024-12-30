const { Peternaks, Kandangs, JenisHewans } = require("../models");
const fs = require("fs");
const path = require("path");

const createKandangWithPhoto = async (req, res) => {
	try {
		const {
			peternak_id,
			jenis_hewan_id,
			nama_kandang,
			jenis_kandang,
			luas,
			kapasitas,
			nilai_bangunan,
			alamat,
			latitude,
			longitude,
		} = req.body;

		const foto_kandang = req.file.path;

		const newKdg = await Kandangs.create({
			peternak_id,
			jenis_hewan_id,
			nama_kandang,
			jenis_kandang,
			luas,
			kapasitas,
			nilai_bangunan,
			alamat,
			latitude,
			longitude,
			foto_kandang,
			photo_type: "With Image",
		});

		return res.status(200).json({
			statusCode: 200,
			content: newKdg,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const createKandangWithoutPhoto = async (req, res) => {
	try {
		const {
			peternak_id,
			jenis_hewan_id,
			nama_kandang,
			jenis_kandang,
			luas,
			kapasitas,
			nilai_bangunan,
			alamat,
			latitude,
			longitude,
			foto_kandang,
			photo_type,
		} = req.body;

		const newKdg = await Kandangs.create({
			peternak_id,
			jenis_hewan_id,
			nama_kandang,
			jenis_kandang,
			luas,
			kapasitas,
			nilai_bangunan,
			alamat,
			latitude,
			longitude,
			foto_kandang,
			photo_type: photo_type === "External Link" ? photo_type : "-",
		});

		return res.status(200).json({
			statusCode: 200,
			content: newKdg,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getKandangs = async (req, res) => {
	try {
		const kdg = await Kandangs.findAll({
			order: [["id", "DESC"]],
			include: [{ model: Peternaks }, { model: JenisHewans }],
		});

		res.status(200).json({
			statusCode: 200,
			content: kdg,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getKandangByPeternak = async (req, res) => {
	try {
		const { id } = req.params;

		const response = await Kandangs.findAll({
			include: [{ model: Peternaks }],
			where: {
				peternak_id: id,
			},
		});

		res.status(200).json({
			statusCode: 200,
			content: response,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const updateKandangWithPhoto = async (req, res) => {
	try {
		const { id } = req.params;

		const {
			peternak_id,
			jenis_hewan_id,
			nama_kandang,
			jenis_kandang,
			luas,
			kapasitas,
			nilai_bangunan,
			alamat,
			latitude,
			longitude,
		} = req.body;

		const foto_kandang = req.file.path;

		const kandang = await Kandangs.findOne({
			where: {
				id,
			},
		});

		await Kandangs.update(
			{
				peternak_id,
				jenis_hewan_id,
				nama_kandang,
				jenis_kandang,
				luas,
				kapasitas,
				nilai_bangunan,
				alamat,
				latitude,
				longitude,
				foto_kandang,
				photo_type: "Upload Image",
			},
			{
				where: {
					id,
				},
			}
		);

		const fotoKandangOldPath = path.join(__dirname, kandang.foto_kandang);

		if (fs.existsSync(fotoKandangOldPath)) {
			fs.unlinkSync(fotoKandangOldPath);
		}

		const updatedKandang = await Kandangs.findOne({
			where: {
				id,
			},
		});

		res.status(200).json({
			statusCode: 200,
			content: updatedKandang,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const updateKandangWithoutPhoto = async (req, res) => {
	try {
		const { id } = req.params;

		const {
			peternak_id,
			jenis_hewan_id,
			nama_kandang,
			jenis_kandang,
			luas,
			kapasitas,
			nilai_bangunan,
			alamat,
			latitude,
			longitude,
			foto_kandang,
			photo_type,
		} = req.body;

		await Kandangs.update(
			{
				peternak_id,
				jenis_hewan_id,
				nama_kandang,
				jenis_kandang,
				luas,
				kapasitas,
				nilai_bangunan,
				alamat,
				latitude,
				longitude,
				foto_kandang: photo_type === "Without Photo" ? "-" : foto_kandang,
				photo_type,
			},
			{
				where: {
					id,
				},
			}
		);

		const updatedKandang = await Kandangs.findOne({
			where: {
				id,
			},
		});

		res.status(200).json({
			statusCode: 200,
			content: updatedKandang,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const deleteKandang = async (req, res) => {
	try {
		const { id } = req.params;

		await Kandangs.destroy({
			where: {
				id,
			},
		});

		res.status(200).json({
			statusCode: 200,
			content: null,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = {
	createKandangWithPhoto,
	createKandangWithoutPhoto,
	getKandangs,
	getKandangByPeternak,
	updateKandangWithPhoto,
	updateKandangWithoutPhoto,
	deleteKandang,
};
