"use strict";

const fs = require("fs");
const { encrypt } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const parsedData = JSON.parse(fs.readFileSync("./seeds/user-seeds.json"));

		const payloads = [];

		parsedData.map((values) => {
			const { role_id, name, username, email, password } = values;

			const encryptedPassword = encrypt(password);

			payloads.push({
				role_id,
				name,
				username,
				email,
				password: encryptedPassword,
				created_at: new Date(),
			});
		});

		await queryInterface.bulkInsert("Users", payloads, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
