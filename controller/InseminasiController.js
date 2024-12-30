const { Inseminasis, Peternaks, Officers, Hewans } = require("../models");

const createInseminasi = async (req, res) => {
	try {
		const {
			petugas_id,
			peternak_id,
			hewan_id,
			produsen,
			ib,
			id_pejantan,
			bangsa_pejantan,
			id_pembuatan,
			tanggal_ib,
		} = req.body;

		const newInseminasi = await Inseminasis.create({
			petugas_id,
			peternak_id,
			hewan_id,
			produsen,
			ib,
			id_pejantan,
			bangsa_pejantan,
			id_pembuatan,
			tanggal_ib: new Date(tanggal_ib).toLocaleDateString("id-ID", {
				weekday: "long",
				day: "2-digit",
				month: "long",
				year: "numeric",
			}),
		});

		res.status(200).json({
			statusCode: 200,
			content: newInseminasi,
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			content: error.message,
		});
	}
};

const getInseminasis = async (req, res) => {
	try {
		const inseminasis = await Inseminasis.findAll({
			order: [["id", "DESC"]],
			include: [{ model: Peternaks }, { model: Hewans }, { model: Officers }],
		});

		res.status(200).json({
			statusCode: 200,
			content: inseminasis,
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			content: error.message,
		});
	}
};

const getInseminasiByPeternakAndHewanId = async (req, res) => {
	try {
		const { peternak_id, hewan_id } = req.params;

		const inseminasis = await Inseminasis.findAll({
			where: {
				peternak_id,
				hewan_id,
			},
			include: [{ model: Peternaks }, { model: Hewans }, { model: Officers }],
		});

		res.status(200).json({
			statusCode: 200,
			content: inseminasis,
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			content: error.message,
		});
	}
};

const updateInseminasi = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			petugas_id,
			peternak_id,
			hewan_id,
			produsen,
			ib,
			id_pejantan,
			bangsa_pejantan,
			id_pembuatan,
			tanggal_ib,
		} = req.body;

		await Inseminasis.update(
			{
				petugas_id,
				peternak_id,
				hewan_id,
				produsen,
				ib,
				id_pejantan,
				bangsa_pejantan,
				id_pembuatan,
				tanggal_ib: new Date(tanggal_ib).toLocaleDateString("id-ID", {
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

		const updatedInseminasi = await Inseminasis.findOne({
			where: {
				id,
			},
		});

		res.status(200).json({
			statusCode: 200,
			content: updatedInseminasi,
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			content: error.message,
		});
	}
};

const deleteInseminasi = async (req, res) => {
	try {
		const { id } = req.params;

		await Inseminasis.destroy({
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
			statusCode: 500,
			content: error.message,
		});
	}
};

module.exports = {
	createInseminasi,
	getInseminasis,
	getInseminasiByPeternakAndHewanId,
	updateInseminasi,
	deleteInseminasi,
};
