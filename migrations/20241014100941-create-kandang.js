"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Kandangs", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			peternak_id: {
				type: Sequelize.INTEGER,
			},
			jenis_hewan_id: {
				type: Sequelize.INTEGER,
			},
			nama_kandang: {
				type: Sequelize.STRING,
			},
			jenis_kandang: {
				type: Sequelize.STRING,
			},
			luas: {
				type: Sequelize.STRING,
			},
			kapasitas: {
				type: Sequelize.STRING,
			},
			nilai_bangunan: {
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
			foto_kandang: {
				type: Sequelize.STRING,
			},
			photo_type: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Kandangs");
	},
};
