"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Kejadians", {
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
			tanggal_laporan: {
				type: Sequelize.STRING,
			},
			tanggal_lahir: {
				type: Sequelize.STRING,
			},
			lokasi: {
				type: Sequelize.STRING,
			},

			kartu_ternak_induk: {
				type: Sequelize.STRING,
			},
			eartag_induk: {
				type: Sequelize.STRING,
			},
			spesies_induk: {
				type: Sequelize.STRING,
			},
			id_pejantan_straw: {
				type: Sequelize.STRING,
			},
			id_batch_straw: {
				type: Sequelize.STRING,
			},
			produsen_straw: {
				type: Sequelize.STRING,
			},
			spesies_pejantan: {
				type: Sequelize.STRING,
			},
			jumlah: {
				type: Sequelize.STRING,
			},
			kartu_ternak_anak: {
				type: Sequelize.STRING,
			},
			eartag_anak: {
				type: Sequelize.STRING,
			},
			id_hewan_anak: {
				type: Sequelize.STRING,
			},
			jenis_kelamin_anak: {
				type: Sequelize.STRING,
			},
			kategori: {
				type: Sequelize.STRING,
			},
			urutan_ib: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Kejadians");
	},
};
