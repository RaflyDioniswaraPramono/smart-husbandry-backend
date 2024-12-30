"use strict";

const fs = require("fs");
const { encrypt } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const parsedData = JSON.parse(fs.readFileSync("./seeds/petugas-seeds.json"));

		const payloads = [];
		const userPayloads = [];

		parsedData.map((val) => {
			const { pekerjaan_id, nik_petugas, nama_petugas, no_telp, email, wilayah } = val;

			payloads.push({
				pekerjaan_id,
				nik_petugas,
				nama_petugas,
				no_telp,
				email,
				wilayah,
			});

			const encryptedPassword = encrypt(nik_petugas);

			userPayloads.push({
				role_id: 2,
				name: nama_petugas,
				username: nik_petugas,
				email: `${nama_petugas}@gmail.com`,
				password: encryptedPassword,
				created_at: new Date(),
			});
		});

		await queryInterface.bulkInsert("Officers", payloads, {});
		await queryInterface.bulkInsert("Users", userPayloads, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Officers", null, {});
	},
};
