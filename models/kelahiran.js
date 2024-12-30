"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Kelahirans extends Model {
		static associate(models) {
			Kelahirans.belongsTo(models.Peternaks, { foreignKey: "peternak_id" });
			Kelahirans.belongsTo(models.Hewans, { foreignKey: "hewan_id" });
			Kelahirans.belongsTo(models.Officers, { foreignKey: "petugas_id" });
			Kelahirans.belongsTo(models.Inseminasis, { foreignKey: "inseminasi_id" });
			Kelahirans.belongsTo(models.Kandangs, { foreignKey: "kandang_id" });
		}
	}
	Kelahirans.init(
		{
			peternak_id: DataTypes.INTEGER,
			hewan_id: DataTypes.INTEGER,
			petugas_id: DataTypes.INTEGER,
			inseminasi_id: DataTypes.INTEGER,
			kandang_id: DataTypes.INTEGER,
			tanggal_laporan: DataTypes.STRING,
			tanggal_lahir: DataTypes.STRING,
			eartag_anak: DataTypes.STRING,
			spesies_anak: DataTypes.STRING,
			jenis_kelamin_anak: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Kelahirans",
			freezeTableName: true,
			createdAt: false,
			updatedAt: false,
		}
	);
	return Kelahirans;
};
