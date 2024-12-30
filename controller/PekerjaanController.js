const { Pekerjaans } = require("../models");

const getAllPekerjaan = async (req, res) => {
	try {
		const response = await Pekerjaans.findAll();

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

module.exports = {
	getAllPekerjaan,
};
