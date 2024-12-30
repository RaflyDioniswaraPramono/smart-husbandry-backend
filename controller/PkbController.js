const { Pkbs, Peternaks, Hewans, Officers } = require("../models");

const createPkb = async (req, res) => {
	try {
		const { peternak_id, hewan_id, petugas_id, tanggal_pkb, spesies, umur_kebuntingan } = req.body;

		const newPkbs = await Pkbs.create({
			peternak_id,
			hewan_id,
			petugas_id,
			tanggal_pkb: new Date(tanggal_pkb).toLocaleDateString("id-ID", {
				weekday: "long",
				day: "2-digit",
				month: "long",
				year: "numeric",
			}),
			spesies,
			umur_kebuntingan,
		});

		res.status(200).json({
			content: newPkbs,
			statusCode: 200,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getPkbs = async (req, res) => {
	try {
		const response = await Pkbs.findAll({
			order: [["id", "DESC"]],
			include: [{ model: Peternaks }, { model: Hewans }, { model: Officers }],
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

const updatePkb = async (req, res) => {
	try {
		const { id } = req.params;
		const { peternak_id, hewan_id, petugas_id, tanggal_pkb, spesies, umur_kebuntingan } = req.body;

		await Pkbs.update(
			{
				peternak_id,
				hewan_id,
				petugas_id,
				tanggal_pkb: new Date(tanggal_pkb).toLocaleDateString("id-ID", {
					weekday: "long",
					day: "2-digit",
					month: "long",
					year: "numeric",
				}),
				spesies,
				umur_kebuntingan,
			},
			{
				where: {
					id,
				},
			}
		);

		const updatedPkb = await Pkbs.findOne({
			where: {
				id,
			},
		});

		res.status(200).json({
			content: updatedPkb,
			statusCode: 200,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const deletePkb = async (req, res) => {
	try {
		const { id } = req.params;

		await Pkbs.destroy({
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
	createPkb,
	updatePkb,
	getPkbs,
	deletePkb,
};
