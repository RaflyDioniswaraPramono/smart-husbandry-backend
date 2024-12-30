"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Beritas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Beritas.init(
    {
      judul: DataTypes.STRING,
      tgl_pembuatan: DataTypes.DATE,
      isi_berita: DataTypes.STRING,
      pembuat: DataTypes.STRING,
      file_path: DataTypes.STRING,
      foto_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Beritas",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Beritas;
};
