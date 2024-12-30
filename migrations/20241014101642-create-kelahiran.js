"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Kelahirans", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			peternak_id: {
				type: Sequelize.INTEGER,
			},
			hewan_id: {
				type: Sequelize.INTEGER,
			},
			petugas_id: {
				type: Sequelize.INTEGER,
			},
			inseminasi_id: {
				type: Sequelize.INTEGER,
			},
			kandang_id: {
				type: Sequelize.INTEGER,
			},
			tanggal_laporan: {
				type: Sequelize.STRING,
			},
			tanggal_lahir: {
				type: Sequelize.STRING,
			},
			eartag_anak: {
				type: Sequelize.STRING,
			},
			spesies_anak: {
				type: Sequelize.STRING,
			},
			jenis_kelamin_anak: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Kelahirans");
	},
};
