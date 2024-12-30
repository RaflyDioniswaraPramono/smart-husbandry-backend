const { Users, Officers, Peternaks } = require("../models");

const addPeternak = async (req, res) => {
	try {
		const {
			nama_peternak,
			nik_peternak,
			provinsi,
			kabupaten,
			kecamatan,
			desa,
			lokasi,
			petugas_id,
			tanggal_pendaftaran,
		} = req.body;

		const newPeternak = await Peternaks.create({
			provinsi,
			kabupaten,
			kecamatan,
			desa,
			nama_peternak,
			nik_peternak,
			petugas_id,
			lokasi,
			tanggal_pendaftaran: new Date(tanggal_pendaftaran).toLocaleDateString("id-ID", {
				weekday: "long",
				day: "2-digit",
				month: "long",
				year: "numeric",
			}),
		});

		res.status(200).json({
			statusCode: 200,
			content: newPeternak,
		});
	} catch (error) {
		console.log(error);
	}
};

const getPeternaks = async (req, res) => {
	try {
		const peternak = await Peternaks.findAll({
			order: [["id", "DESC"]],
			include: [{ model: Officers }],
		});

		res.status(200).json({
			statusCode: 200,
			content: peternak,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getPeternakById = async (req, res) => {
	try {
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const editPeternak = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			nama_peternak,
			nik_peternak,
			provinsi,
			kabupaten,
			kecamatan,
			desa,
			lokasi,
			petugas_id,
			tanggal_pendaftaran,
		} = req.body;

		await Peternaks.update(
			{
				provinsi,
				kabupaten,
				kecamatan,
				desa,
				nama_peternak,
				nik_peternak,
				petugas_id,
				lokasi,
				tanggal_pendaftaran: new Date(tanggal_pendaftaran).toLocaleDateString("id-ID", {
					weekday: "long",
					day: "2-digit",
					month: "long",
					year: "numeric",
				}),
			},
			{
				where: {
					id,
				},
			}
		);

		await Users.update(
			{
				name: nama_peternak,
				username: nik_peternak,
				email: nama_peternak + "@gmail.com",
			},
			{
				where: {
					username: nik_peternak,
					role_id: 3,
				},
			}
		);

		res.status(200).json({
			statusCode: 200,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const deletePeternak = async (req, res) => {
	try {
		const { nik_peternak } = req.params;

		await Peternaks.destroy({
			where: {
				nik_peternak,
			},
		});

		await Users.destroy({
			where: {
				role_id: 3,
				username: nik_peternak,
			},
		});

		res.status(200).json({
			statusCode: 200,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = {
	addPeternak,
	getPeternaks,
	getPeternakById,
	editPeternak,
	deletePeternak,
};
