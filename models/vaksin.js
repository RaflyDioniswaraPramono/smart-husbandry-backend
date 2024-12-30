"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Vaksins extends Model {
		static associate(models) {
			Vaksins.belongsTo(models.Peternaks, { foreignKey: "peternak_id" });
			Vaksins.belongsTo(models.Hewans, { foreignKey: "hewan_id" });
			Vaksins.belongsTo(models.Officers, { foreignKey: "petugas_id" });
		}
	}
	Vaksins.init(
		{
			peternak_id: DataTypes.INTEGER,
			hewan_id: DataTypes.INTEGER,
			petugas_id: DataTypes.INTEGER,
			nama_vaksin: DataTypes.STRING,
			jenis_vaksin: DataTypes.STRING,
			tanggal_vaksin: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Vaksins",
			freezeTableName: true,
			createdAt: false,
			updatedAt: false,
		}
	);
	return Vaksins;
};
