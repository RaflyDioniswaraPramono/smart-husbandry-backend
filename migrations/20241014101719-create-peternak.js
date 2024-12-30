"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Peternaks", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			nik_peternak: {
				type: Sequelize.STRING,
			},
			nama_peternak: {
				type: Sequelize.STRING,
			},
			provinsi: {
				type: Sequelize.STRING,
			},
			kabupaten: {
				type: Sequelize.STRING,
			},
			kecamatan: {
				type: Sequelize.STRING,
			},
			desa: {
				type: Sequelize.STRING,
			},
			lokasi: {
				type: Sequelize.STRING,
			},
			petugas_id: {
				type: Sequelize.INTEGER,
			},
			tanggal_pendaftaran: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Peternaks");
	},
};
