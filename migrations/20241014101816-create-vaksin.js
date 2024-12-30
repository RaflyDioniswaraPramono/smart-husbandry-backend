"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Vaksins", {
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
			nama_vaksin: {
				type: Sequelize.STRING,
			},
			jenis_vaksin: {
				type: Sequelize.STRING,
			},
			tanggal_vaksin: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Vaksins");
	},
};
