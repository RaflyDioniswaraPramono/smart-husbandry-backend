"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Pengobatans extends Model {
		static associate(models) {
			Pengobatans.belongsTo(models.Officers, { foreignKey: "petugas_id" });
		}
	}
	Pengobatans.init(
		{
			tanggal_pengobatan: DataTypes.STRING,
			tanggal_kasus: DataTypes.STRING,
			petugas_id: DataTypes.INTEGER,
			nama_infrastruktur: DataTypes.STRING,
			lokasi: DataTypes.STRING,
			dosis: DataTypes.STRING,
			sindrom: DataTypes.STRING,
			diagnosa_banding: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Pengobatans",
			freezeTableName: true,
			createdAt: false,
			updatedAt: false,
		}
	);
	return Pengobatans;
};
