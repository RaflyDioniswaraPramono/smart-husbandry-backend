"use strict";

const fs = require("fs");
const { encrypt } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const parsedData = JSON.parse(fs.readFileSync("./seeds/peternak-seeds.json"));

		const payloads = [];
		const userPayloads = [];

		parsedData.map((val) => {
			const {
				petugas_id,
				nik_peternak,
				nama_peternak,
				provinsi,
				kabupaten,
				kecamatan,
				desa,
				lokasi,
			} = val;

			payloads.push({
				petugas_id,
				nik_peternak,
				nama_peternak,
				provinsi,
				kabupaten,
				kecamatan,
				desa,
				lokasi,
				tanggal_pendaftaran: new Date().toLocaleDateString("id-ID", {
					weekday: "long",
					day: "2-digit",
					month: "long",
					year: "numeric",
				}),
			});

			const encryptedPassword = encrypt(nik_peternak);

			userPayloads.push({
				role_id: 3,
				name: nama_peternak,
				username: nik_peternak,
				email: `${nama_peternak}@gmail.com`,
				password: encryptedPassword,
				created_at: new Date(),
			});
		});

		await queryInterface.bulkInsert("Peternaks", payloads, {});
		await queryInterface.bulkInsert("Users", userPayloads, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Peternaks", null, {});
	},
};
