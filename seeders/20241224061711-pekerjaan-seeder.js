"use strict";

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const parsedData = JSON.parse(fs.readFileSync("./seeds/pekerjaan-seeds.json"));

		const payloads = [];

		parsedData.map((val) => {
			const { nama_pekerjaan } = val;

			payloads.push({
				nama_pekerjaan,
			});
		});

		await queryInterface.bulkInsert("Pekerjaans", payloads, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Pekerjaans", null, {});
	},
};
