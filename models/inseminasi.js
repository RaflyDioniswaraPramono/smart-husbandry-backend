"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Inseminasis extends Model {
		static associate(models) {
			Inseminasis.belongsTo(models.Officers, { foreignKey: "petugas_id" });
			Inseminasis.belongsTo(models.Peternaks, { foreignKey: "peternak_id" });
			Inseminasis.belongsTo(models.Hewans, { foreignKey: "hewan_id" });
			Inseminasis.hasMany(models.Kelahirans, { foreignKey: "inseminasi_id" });
		}
	}
	Inseminasis.init(
		{
			petugas_id: DataTypes.INTEGER,
			peternak_id: DataTypes.INTEGER,
			hewan_id: DataTypes.INTEGER,
			produsen: DataTypes.STRING,
			ib: DataTypes.STRING,
			id_pejantan: DataTypes.STRING,
			bangsa_pejantan: DataTypes.STRING,
			id_pembuatan: DataTypes.STRING,
			tanggal_ib: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Inseminasis",
			freezeTableName: true,
			createdAt: false,
			updatedAt: false,
		}
	);
	return Inseminasis;
};
