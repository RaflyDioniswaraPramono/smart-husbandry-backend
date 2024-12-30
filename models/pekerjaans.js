"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Pekerjaans extends Model {
		static associate(models) {
			Pekerjaans.hasMany(models.Officers, { foreignKey: "pekerjaan_id" });
		}
	}
	Pekerjaans.init(
		{
			nama_pekerjaan: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Pekerjaans",
			freezeTableName: true,
			createdAt: false,
			updatedAt: false,
		}
	);
	return Pekerjaans;
};
