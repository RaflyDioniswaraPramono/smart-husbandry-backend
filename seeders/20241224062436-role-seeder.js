"use strict";

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const parsedData = JSON.parse(fs.readFileSync("./seeds/role-seeds.json"));

		const payloads = [];

		parsedData.map((val) => {
			const { nama_role } = val;

			payloads.push({
				nama_role,
			});
		});

		await queryInterface.bulkInsert("Roles", payloads, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Roles", null, {});
	},
};
