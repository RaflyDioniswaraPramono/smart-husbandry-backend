const { Pengobatans, Officers } = require("../models");

const createPengobatan = async (req, res) => {
	try {
		const {
			tanggal_pengobatan,
			tanggal_kasus,
			petugas_id,
			nama_infrastruktur,
			lokasi,
			dosis,
			sindrom,
			diagnosa_banding,
		} = req.body;

		const newPengobatan = await Pengobatans.create({
			tanggal_pengobatan: new Date(tanggal_pengobatan).toLocaleDateString("id-ID", {
				weekday: "long",
				day: "2-digit",
				month: "long",
				year: "numeric",
			}),
			tanggal_kasus: new Date(tanggal_kasus).toLocaleDateString("id-ID", {
				weekday: "long",
				day: "2-digit",
				month: "long",
				year: "numeric",
			}),
			petugas_id,
			nama_infrastruktur,
			lokasi,
			dosis,
			sindrom,
			diagnosa_banding,
		});

		res.status(200).json({
			content: newPengobatan,
			statusCode: 200,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getPengobatans = async (req, res) => {
	try {
		const response = await Pengobatans.findAll({
			order: [["id", "DESC"]],
			include: [{ model: Officers }],
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

const updatePengobatan = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			tanggal_pengobatan,
			tanggal_kasus,
			petugas_id,
			nama_infrastruktur,
			lokasi,
			dosis,
			sindrom,
			diagnosa_banding,
		} = req.body;

		await Pengobatans.update(
			{
				tanggal_pengobatan: new Date(tanggal_pengobatan).toLocaleDateString("id-ID", {
					weekday: "long",
					day: "2-digit",
					month: "long",
					year: "numeric",
				}),
				tanggal_kasus: new Date(tanggal_kasus).toLocaleDateString("id-ID", {
					weekday: "long",
					day: "2-digit",
					month: "long",
					year: "numeric",
				}),
				petugas_id,
				nama_infrastruktur,
				lokasi,
				dosis,
				sindrom,
				diagnosa_banding,
			},
			{
				where: {
					id,
				},
			}
		);

		const updatedPengobatan = await Pengobatans.findOne({
			where: {
				id,
			},
		});

		res.status(200).json({
			content: updatedPengobatan,
			statusCode: 200,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const deletePengobatan = async (req, res) => {
	try {
		const { id } = req.params;

		await Pengobatans.destroy({
			where: {
				id,
			},
		});

		res.status(200).json({
			content: null,
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
	createPengobatan,
	getPengobatans,
	updatePengobatan,
	deletePengobatan,
};
