"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Hewans", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			petugas_id: {
				type: Sequelize.INTEGER,
			},
			peternak_id: {
				type: Sequelize.INTEGER,
			},
			kandang_id: {
				type: Sequelize.INTEGER,
			},
			kode_eartag_nasional: {
				type: Sequelize.STRING,
			},
			no_kartu_ternak: {
				type: Sequelize.STRING,
			},
			spesies: {
				type: Sequelize.STRING,
			},
			sex: {
				type: Sequelize.STRING,
			},
			umur: {
				type: Sequelize.STRING,
			},
			identifikasi_hewan: {
				type: Sequelize.STRING,
			},
			tanggal_terdaftar: {
				type: Sequelize.STRING,
			},
			alamat: {
				type: Sequelize.STRING,
			},
			latitude: {
				type: Sequelize.STRING,
			},
			longitude: {
				type: Sequelize.STRING,
			},
			foto_hewan: {
				type: Sequelize.STRING,
			},
			photo_type: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Hewans");
	},
};
