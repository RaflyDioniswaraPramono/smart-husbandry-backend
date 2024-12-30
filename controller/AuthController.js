const { Users } = require("../models");
const { decrypt, encrypt } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

const signIn = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await Users.findOne({
			where: {
				username: username,
			},
		});

		if (!user) {
			return res.status(404).json({
				success: false,
				data: {
					message: "Username tidak terdaftar!",
				},
			});
		}

		const decryptedPassword = decrypt(password, user.password);

		if (!decryptedPassword) {
			return res.status(401).json({
				success: false,
				message: "Password salah!",
			});
		}

		const token = generateToken(user);

		res.status(200).json({
			success: true,
			accessToken: token,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const signUp = async (req, res) => {
	try {
		const { role_id, name, email, username, password } = req.body;

		const encryptedPassword = encrypt(password);

		const newUsers = await Users.create({
			role_id,
			name,
			email,
			username,
			password: encryptedPassword,
			created_at: new Date(),
		});

		res.status(200).json({
			success: true,
			content: newUsers,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = {
	signIn,
	signUp,
};
