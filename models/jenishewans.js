"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class JenisHewans extends Model {
		static associate(models) {
			JenisHewans.hasMany(models.Kandangs, { foreignKey: "jenis_hewan_id" });
		}
	}
	JenisHewans.init(
		{
			jenis: DataTypes.STRING,
			deskripsi: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "JenisHewans",
			freezeTableName: true,
			createdAt: false,
			updatedAt: false,
		}
	);

	return JenisHewans;
};
