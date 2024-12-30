"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Beritas", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			judul: {
				type: Sequelize.STRING,
			},
			tgl_pembuatan: {
				type: Sequelize.DATE,
			},
			isi_berita: {
				type: Sequelize.STRING,
			},
			pembuat: {
				type: Sequelize.STRING,
			},
			file_path: {
				type: Sequelize.STRING,
			},
			foto_type: {
				type: Sequelize.STRING,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Beritas");
	},
};
