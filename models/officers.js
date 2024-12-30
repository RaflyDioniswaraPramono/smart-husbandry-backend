"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Officers extends Model {
		static associate(models) {
			Officers.hasMany(models.Peternaks, { foreignKey: "petugas_id" });
			Officers.hasMany(models.Hewans, { foreignKey: "petugas_id" });
			Officers.belongsTo(models.Pekerjaans, { foreignKey: "pekerjaan_id" });
			Officers.hasMany(models.Vaksins, { foreignKey: "petugas_id" });
			Officers.hasMany(models.Inseminasis, { foreignKey: "petugas_id" });
			Officers.hasMany(models.Kelahirans, { foreignKey: "petugas_id" });
			Officers.hasMany(models.Pengobatans, { foreignKey: "petugas_id" });
			Officers.hasMany(models.Pkbs, { foreignKey: "petugas_id" });
		}
	}
	Officers.init(
		{
			pekerjaan_id: DataTypes.INTEGER,
			nik_petugas: DataTypes.STRING,
			nama_petugas: DataTypes.STRING,
			no_telp: DataTypes.STRING,
			email: DataTypes.STRING,
			wilayah: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Officers",
			freezeTableName: true,
			createdAt: false,
			updatedAt: false,
		}
	);
	return Officers;
};
