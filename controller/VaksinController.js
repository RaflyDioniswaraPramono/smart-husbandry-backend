const { Vaksins, Peternaks, Hewans, Officers } = require("../models");

const createVaksin = async (req, res) => {
	try {
		const { peternak_id, hewan_id, petugas_id, nama_vaksin, jenis_vaksin, tanggal_vaksin } =
			req.body;

		const newVaksin = await Vaksins.create({
			peternak_id,
			hewan_id,
			petugas_id,
			nama_vaksin,
			jenis_vaksin,
			tanggal_vaksin: new Date(tanggal_vaksin).toLocaleDateString("id-ID", {
				weekday: "long",
				day: "2-digit",
				month: "long",
				year: "numeric",
			}),
		});

		res.status(200).json({
			content: newVaksin,
			statusCode: 200,
		});
	} catch (error) {
		res.status(500).json({
			content: error.message,
			statusCode: 500,
		});
	}
};

const getVaksins = async (req, res) => {
	try {
		const vaksins = await Vaksins.findAll({
			order: [["id", "DESC"]],
			include: [{ model: Peternaks }, { model: Hewans }, { model: Officers }],
		});

		res.status(200).json({
			content: vaksins,
			statusCode: 200,
		});
	} catch (error) {
		res.status(500).json({
			content: error.message,
			statusCode: 500,
		});
	}
};

const getVaksinsByPeternakId = async (req, res) => {
	try {
		const { id } = req.params;

		const vaksins = await Vaksins.findAll({
			where: {
				peternak_id: id,
			},
			include: [{ model: Peternaks }, { model: Hewans }, { model: Officers }],
		});

		res.status(200).json({
			content: vaksins,
			statusCode: 200,
		});
	} catch (error) {
		res.status(500).json({
			content: error.message,
			statusCode: 500,
		});
	}
};

const updateVaksin = async (req, res) => {
	try {
		const { id } = req.params;
		const { peternak_id, hewan_id, petugas_id, nama_vaksin, jenis_vaksin, tanggal_vaksin } =
			req.body;

		await Vaksins.update(
			{
				peternak_id,
				hewan_id,
				petugas_id,
				nama_vaksin,
				jenis_vaksin,
				tanggal_vaksin,
			},
			{
				where: {
					id,
				},
			}
		);

		const updatedVaksin = await Vaksins.findOne({
			where: {
				id,
			},
		});

		res.status(200).json({
			content: updatedVaksin,
			statusCode: 200,
		});
	} catch (error) {
		res.status(500).json({
			content: error.message,
			statusCode: 500,
		});
	}
};

const deleteVaksin = async (req, res) => {
	try {
		const { id } = req.params;

		await Vaksins.destroy({
			where: {
				id,
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
	createVaksin,
	getVaksins,
	getVaksinsByPeternakId,
	updateVaksin,
	deleteVaksin,
};
