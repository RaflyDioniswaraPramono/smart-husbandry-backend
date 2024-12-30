"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Pkbs extends Model {
		static associate(models) {
			Pkbs.belongsTo(models.Peternaks, { foreignKey: "peternak_id" });
			Pkbs.belongsTo(models.Hewans, { foreignKey: "hewan_id" });
			Pkbs.belongsTo(models.Officers, { foreignKey: "petugas_id" });
		}
	}
	Pkbs.init(
		{
			peternak_id: DataTypes.INTEGER,
			hewan_id: DataTypes.INTEGER,
			petugas_id: DataTypes.INTEGER,
			tanggal_pkb: DataTypes.STRING,
			spesies: DataTypes.STRING,
			umur_kebuntingan: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Pkbs",
			freezeTableName: true,
			createdAt: false,
			updatedAt: false,
		}
	);
	return Pkbs;
};
