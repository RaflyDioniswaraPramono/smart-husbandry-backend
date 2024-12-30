const { Users, Officers, Pekerjaans } = require("../models");

const createPetugas = async (req, res) => {
	try {
		const { pekerjaan_id, nik_petugas, nama_petugas, no_telp, email, wilayah } = req.body;

		const newPetugas = await Officers.create({
			pekerjaan_id,
			nik_petugas,
			nama_petugas,
			no_telp,
			email,
			wilayah,
		});

		res.status(200).json(newPetugas);
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getPetugasAll = async (req, res) => {
	try {
		const response = await Officers.findAll({
			order: [["id", "DESC"]],
			include: [{ model: Pekerjaans }],
		});

		res.status(200).json({
			content: response,
			statusCode: 200,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const editPetugas = async (req, res) => {
	try {
		const { id } = req.params;
		const { nik_petugas, nama_petugas, no_telp, email, wilayah } = req.body;

		const petugas = await Officers.findOne({
			where: {
				id,
			},
		});

		await Users.update(
			{
				name: nama_petugas,
				username: nik_petugas,
				email: nama_petugas + "@gmail.com",
			},
			{
				where: {
					username: petugas.nik_petugas,
					role_id: 2,
				},
			}
		);

		await Officers.update(
			{
				nama_petugas,
				nik_petugas,
				no_telp,
				email,
				wilayah,
			},
			{
				where: {
					id,
				},
			}
		);

		const updatedPetugas = await Officers.findOne({
			id,
		});

		res.status(200).json({
			statusCode: 200,
			content: updatedPetugas,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const deletePetugas = async (req, res) => {
	try {
		const { nik_petugas } = req.params;

		await Officers.destroy({
			where: {
				nik_petugas,
			},
		});

		await Users.destroy({
			where: {
				role_id: 2,
				username: nik_petugas,
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
	deletePetugas,
	editPetugas,
	createPetugas,
	getPetugasAll,
};
