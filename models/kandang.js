"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Kandangs extends Model {
		static associate(models) {
			Kandangs.belongsTo(models.Peternaks, { foreignKey: "peternak_id" });
			Kandangs.hasMany(models.Hewans, { foreignKey: "kandang_id" });
			Kandangs.belongsTo(models.JenisHewans, { foreignKey: "jenis_hewan_id" });
			Kandangs.hasMany(models.Kelahirans, { foreignKey: "kandang_id" });
		}
	}
	Kandangs.init(
		{
			peternak_id: DataTypes.INTEGER,
			jenis_hewan_id: DataTypes.INTEGER,
			nama_kandang: DataTypes.STRING,
			jenis_kandang: DataTypes.STRING,
			luas: DataTypes.STRING,
			kapasitas: DataTypes.STRING,
			nilai_bangunan: DataTypes.STRING,
			alamat: DataTypes.STRING,
			latitude: DataTypes.STRING,
			longitude: DataTypes.STRING,
			foto_kandang: DataTypes.STRING,
			photo_type: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Kandangs",
			freezeTableName: true,
			createdAt: false,
			updatedAt: false,
		}
	);
	return Kandangs;
};
