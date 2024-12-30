const { Kelahirans, Peternaks, Hewans, Officers, Inseminasis, Kandangs } = require("../models");

const createKelahirans = async (req, res) => {
	try {
		const {
			peternak_id,
			hewan_id,
			petugas_id,
			inseminasi_id,
			kandang_id,
			tanggal_laporan,
			tanggal_lahir,
			eartag_anak,
			spesies_anak,
			jenis_kelamin_anak,
		} = req.body;

		const newKelahiran = await Kelahirans.create({
			peternak_id,
			hewan_id,
			petugas_id,
			inseminasi_id,
			kandang_id,
			tanggal_laporan: new Date(tanggal_laporan).toLocaleDateString("id-ID", {
				weekday: "long",
				day: "2-digit",
				month: "long",
				year: "numeric",
			}),
			tanggal_lahir: new Date(tanggal_lahir).toLocaleDateString("id-ID", {
				weekday: "long",
				day: "2-digit",
				month: "long",
				year: "numeric",
			}),
			eartag_anak,
			spesies_anak,
			jenis_kelamin_anak,
		});

		res.status(200).json({
			statusCode: 200,
			content: newKelahiran,
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			content: error.message,
		});
	}
};

const getKelahirans = async (req, res) => {
	try {
		const kelahirans = await Kelahirans.findAll({
			order: [["id", "DESC"]],
			include: [
				{ model: Peternaks },
				{ model: Hewans },
				{ model: Officers },
				{ model: Kandangs },
				{ model: Inseminasis },
			],
		});

		res.status(200).json({
			statusCode: 200,
			content: kelahirans,
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			content: error.message,
		});
	}
};

const updateKelahiran = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			peternak_id,
			hewan_id,
			petugas_id,
			inseminasi_id,
			kandang_id,
			tanggal_laporan,
			tanggal_lahir,
			eartag_anak,
			spesies_anak,
			jenis_kelamin_anak,
		} = req.body;

		await Kelahirans.update(
			{
				peternak_id,
				hewan_id,
				petugas_id,
				inseminasi_id,
				kandang_id,
				tanggal_laporan: new Date(tanggal_laporan).toLocaleDateString("id-ID", {
					weekday: "long",
					day: "2-digit",
					month: "long",
					year: "numeric",
				}),
				tanggal_lahir: new Date(tanggal_lahir).toLocaleDateString("id-ID", {
					weekday: "long",
					day: "2-digit",
					month: "long",
					year: "numeric",
				}),
				eartag_anak,
				spesies_anak,
				jenis_kelamin_anak,
			},
			{
				where: {
					id,
				},
			}
		);

		const updatedKelahiran = await Kelahirans.findOne({
			where: {
				id,
			},
		});

		res.status(200).json({
			statusCode: 200,
			content: updatedKelahiran,
		});
	} catch (error) {
		res.status(500).json({
			statusCode: 500,
			content: error.message,
		});
	}
};

const deleteKelahirans = async (req, res) => {
	try {
		const { id } = req.params;

		await Kelahirans.destroy({
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
	getKelahirans,
	createKelahirans,
	updateKelahiran,
	deleteKelahirans,
};
