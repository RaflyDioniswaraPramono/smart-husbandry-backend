const { Officers, Peternaks, Hewans, Kandangs } = require("../models");
const path = require("path");
const fs = require("fs");

const createHewanWithPhoto = async (req, res) => {
	try {
		const {
			kode_eartag_nasional,
			no_kartu_ternak,
			petugas_id,
			peternak_id,
			kandang_id,
			spesies,
			sex,
			umur,
			identifikasi_hewan,
			tanggal_terdaftar,
			alamat,
			latitude,
			longitude,
		} = req.body;

		const foto_hewan = req.file.path;

		const newHewan = await Hewans.create({
			kode_eartag_nasional,
			no_kartu_ternak,
			alamat,
			latitude,
			longitude,
			peternak_id,
			kandang_id,
			spesies,
			sex,
			umur,
			identifikasi_hewan,
			petugas_id,
			tanggal_terdaftar: new Date(tanggal_terdaftar).toLocaleDateString("id-ID", {
				weekday: "long",
				day: "2-digit",
				month: "long",
				year: "numeric",
			}),
			foto_hewan,
			photo_type: "Upload Image",
		});

		res.status(200).json({
			statusCode: 200,
			content: newHewan,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const createHewanWithoutPhoto = async (req, res) => {
	try {
		const {
			kode_eartag_nasional,
			no_kartu_ternak,
			petugas_id,
			peternak_id,
			kandang_id,
			spesies,
			sex,
			umur,
			identifikasi_hewan,
			tanggal_terdaftar,
			alamat,
			latitude,
			longitude,
			foto_hewan,
			photo_type,
		} = req.body;

		const newHewan = await Hewans.create({
			kode_eartag_nasional,
			no_kartu_ternak,
			alamat,
			latitude,
			longitude,
			peternak_id,
			kandang_id,
			spesies,
			sex,
			umur,
			identifikasi_hewan,
			petugas_id,
			tanggal_terdaftar: new Date(tanggal_terdaftar).toLocaleDateString("id-ID", {
				weekday: "long",
				day: "2-digit",
				month: "long",
				year: "numeric",
			}),
			foto_hewan,
			photo_type: photo_type === "External Link" ? photo_type : "-",
		});

		res.status(200).json({
			statusCode: 200,
			content: newHewan,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getHewans = async (req, res) => {
	try {
		const hewans = await Hewans.findAll({
			order: [["id", "DESC"]],
			include: [{ model: Officers }, { model: Peternaks }, { model: Kandangs }],
		});

		res.status(200).json({
			statusCode: 200,
			content: hewans,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getHewansByPeternak = async (req, res) => {
	try {
		const { id } = req.params;

		const hewans = await Hewans.findAll({
			where: {
				peternak_id: id,
			},
			include: [{ model: Officers }, { model: Peternaks }, { model: Kandangs }],
		});

		res.status(200).json({
			statusCode: 200,
			content: hewans,
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			content: error.message,
		});
	}
};

const updateHewanWithPhoto = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			kode_eartag_nasional,
			no_kartu_ternak,
			petugas_id,
			peternak_id,
			kandang_id,
			spesies,
			sex,
			umur,
			identifikasi_hewan,
			tanggal_terdaftar,
			alamat,
			latitude,
			longitude,
		} = req.body;

		const foto_hewan = req.file.path;

		const hewan = await Hewans.findOne({
			where: {
				id,
			},
		});

		await Hewans.update(
			{
				kode_eartag_nasional,
				no_kartu_ternak,
				alamat,
				latitude,
				longitude,
				peternak_id,
				kandang_id,
				spesies,
				sex,
				umur,
				identifikasi_hewan,
				petugas_id,
				tanggal_terdaftar: new Date(tanggal_terdaftar).toLocaleDateString("id-ID", {
					weekday: "long",
					day: "2-digit",
					month: "long",
					year: "numeric",
				}),
				foto_hewan,
				photo_type: "Upload Image",
			},
			{
				where: {
					id,
				},
			}
		);

		const fotoHewanOldPath = path.join(__dirname, hewan.foto_hewan);

		if (fs.existsSync(fotoHewanOldPath)) {
			fs.unlinkSync(fotoHewanOldPath);
		}

		const updatedHewan = await Hewans.findOne({
			where: {
				id,
			},
		});

		res.status(200).json({
			statusCode: 200,
			content: updatedHewan,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const updateHewanWithoutPhoto = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			kode_eartag_nasional,
			no_kartu_ternak,
			petugas_id,
			peternak_id,
			kandang_id,
			spesies,
			sex,
			umur,
			identifikasi_hewan,
			tanggal_terdaftar,
			alamat,
			latitude,
			longitude,
			foto_hewan,
			photo_type,
		} = req.body;

		await Hewans.update(
			{
				kode_eartag_nasional,
				no_kartu_ternak,
				alamat,
				latitude,
				longitude,
				peternak_id,
				kandang_id,
				spesies,
				sex,
				umur,
				identifikasi_hewan,
				petugas_id,
				tanggal_terdaftar: new Date(tanggal_terdaftar).toLocaleDateString("id-ID", {
					weekday: "long",
					day: "2-digit",
					month: "long",
					year: "numeric",
				}),
				foto_hewan: photo_type === "Without Photo" ? "-" : foto_hewan,
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

const deleteHewan = async (req, res) => {
	try {
		const { id } = req.params;

		await Hewans.destroy({
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
	createHewanWithPhoto,
	createHewanWithoutPhoto,
	updateHewanWithPhoto,
	updateHewanWithoutPhoto,
	getHewans,
	getHewansByPeternak,
	deleteHewan,
};
