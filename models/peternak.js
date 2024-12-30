"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Peternaks extends Model {
		static associate(models) {
			Peternaks.belongsTo(models.Officers, { foreignKey: "petugas_id" });
			Peternaks.hasMany(models.Kandangs, { foreignKey: "peternak_id" });
			Peternaks.hasMany(models.Hewans, { foreignKey: "peternak_id" });
			Peternaks.hasMany(models.Vaksins, { foreignKey: "peternak_id" });
			Peternaks.hasMany(models.Inseminasis, { foreignKey: "peternak_id" });
			Peternaks.hasMany(models.Kelahirans, { foreignKey: "peternak_id" });
			Peternaks.hasMany(models.Pkbs, { foreignKey: "peternak_id" });
		}
	}
	Peternaks.init(
		{
			nik_peternak: DataTypes.STRING,
			nama_peternak: DataTypes.STRING,
			provinsi: DataTypes.STRING,
			kabupaten: DataTypes.STRING,
			kecamatan: DataTypes.STRING,
			desa: DataTypes.STRING,
			lokasi: DataTypes.STRING,
			petugas_id: DataTypes.INTEGER,
			tanggal_pendaftaran: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Peternaks",
			freezeTableName: true,
			createdAt: false,
			updatedAt: false,
		}
	);
	return Peternaks;
};
