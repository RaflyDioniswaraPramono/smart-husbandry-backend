"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Inseminasis", {
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
			produsen: {
				type: Sequelize.STRING,
			},
			ib: {
				type: Sequelize.STRING,
			},			
			id_pejantan: {
				type: Sequelize.STRING,
			},
			bangsa_pejantan: {
				type: Sequelize.STRING,
			},
			id_pembuatan: {
				type: Sequelize.STRING,
			},
			tanggal_ib: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Inseminasis");
	},
};
