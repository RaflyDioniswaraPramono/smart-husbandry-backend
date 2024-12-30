const { Users, Roles } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const getUserInfo = async (req, res) => {
	try {
		const header = req.headers.authorization;

		const token = header.split(" ")[1];

		const id = verifyToken(token);

		const response = await Users.findOne({
			where: {
				id,
			},
			include: [{ model: Roles }],
		});

		if (!response) {
			return res.status(404).json({
				success: false,
				message: "Not found!",
			});
		}

		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const getUserByUsername = async (req, res) => {
	try {
		const { username } = req.params;

		const usr = await Users.findOne({
			where: {
				username,
			},
		});

		res.status(200).json(usr);
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		await Users.destroy({
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
	deleteUser,
	getUserByUsername,
	getUserInfo,
};
