"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Pkbs", {
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
			tanggal_pkb: {
				type: Sequelize.STRING,
			},
			spesies: {
				type: Sequelize.STRING,
			},
			umur_kebuntingan: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Pkbs");
	},
};
