"use strict";

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const parsedData = JSON.parse(fs.readFileSync("./seeds/jenis-hewan-seeds.json"));

		const payloads = [];

		parsedData.map((val) => {
			const { jenis, deskripsi } = val;

			payloads.push({
				jenis,
				deskripsi,
			});
		});

		await queryInterface.bulkInsert("JenisHewans", payloads, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("JenisHewans", null, {});
	},
};
