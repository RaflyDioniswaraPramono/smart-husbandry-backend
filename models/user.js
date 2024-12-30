"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		static associate(models) {
			Users.belongsTo(models.Roles, { foreignKey: "role_id" });
		}
	}
	Users.init(
		{
			role_id: DataTypes.INTEGER,
			name: DataTypes.STRING,
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			created_at: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "Users",
			freezeTableName: true,
			createdAt: false,
			updatedAt: false,
		}
	);
	return Users;
};
