"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Hewans extends Model {
		static associate(models) {
			Hewans.belongsTo(models.Officers, { foreignKey: "petugas_id" });
			Hewans.belongsTo(models.Kandangs, { foreignKey: "kandang_id" });
			Hewans.belongsTo(models.Peternaks, { foreignKey: "peternak_id" });
			Hewans.hasMany(models.Vaksins, { foreignKey: "hewan_id" });
			Hewans.hasMany(models.Inseminasis, { foreignKey: "hewan_id" });
			Hewans.hasMany(models.Kelahirans, { foreignKey: "hewan_id" });
			Hewans.hasMany(models.Pkbs, { foreignKey: "hewan_id" });
		}
	}
	Hewans.init(
		{
			kode_eartag_nasional: DataTypes.STRING,
			no_kartu_ternak: DataTypes.STRING,
			petugas_id: DataTypes.INTEGER,
			peternak_id: DataTypes.INTEGER,
			kandang_id: DataTypes.INTEGER,
			spesies: DataTypes.STRING,
			sex: DataTypes.STRING,
			umur: DataTypes.STRING,
			identifikasi_hewan: DataTypes.STRING,
			tanggal_terdaftar: DataTypes.STRING,
			alamat: DataTypes.STRING,
			latitude: DataTypes.STRING,
			longitude: DataTypes.STRING,
			foto_hewan: DataTypes.STRING,
			photo_type: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Hewans",
			freezeTableName: true,
			createdAt: false,
			updatedAt: false,
		}
	);
	return Hewans;
};
