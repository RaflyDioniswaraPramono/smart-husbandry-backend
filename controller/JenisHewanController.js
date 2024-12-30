const { JenisHewans } = require("../models");

const createJenisHewans = async (req, res) => {
	try {
		const { jenis, deskripsi } = req.body;

		const newJenisHewan = await JenisHewans.create({
			jenis,
			deskripsi,
		});

		res.status(200).json({
			statusCode: 200,
			content: newJenisHewan,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getJenisHewans = async (req, res) => {
	try {
		const jenisHewan = await JenisHewans.findAll({
			order: [["id", "DESC"]],
		});

		res.status(200).json({
			statusCode: 200,
			content: jenisHewan,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const updateJenisHewans = async (req, res) => {
	try {
		const { id } = req.params;
		const { jenis, deskripsi } = req.body;

		await JenisHewans.update(
			{
				jenis,
				deskripsi,
			},
			{
				where: {
					id,
				},
			}
		);

		const updatedJenisHewan = await JenisHewans.findOne({
			where: {
				id,
			},
		});

		res.status(200).json({
			statusCode: 200,
			content: updatedJenisHewan,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const deleteJenisHewans = async (req, res) => {
	try {
		const { id } = req.params;

		await JenisHewans.destroy({
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
	createJenisHewans,
	getJenisHewans,
	updateJenisHewans,
	deleteJenisHewans,
};
