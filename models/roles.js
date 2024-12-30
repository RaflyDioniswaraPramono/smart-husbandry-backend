"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Roles extends Model {
		static associate(models) {
			Roles.hasMany(models.Users, { foreignKey: "role_id" });
		}
	}
	Roles.init(
		{
			nama_role: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Roles",
			freezeTableName: true,
			createdAt: false,
			updatedAt: false,
		}
	);
	return Roles;
};
