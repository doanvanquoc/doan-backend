'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonAn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MonAn.init({
    id_mon_an: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ten_mon_an: DataTypes.STRING,
    mo_ta: DataTypes.STRING,
    gia: DataTypes.DECIMAL(10, 2),
    id_danh_muc: DataTypes.INTEGER,
    trang_thai: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
  }, {
    timestamps: false,
    sequelize,
    modelName: 'MonAn',
    tableName: 'mon_an'
  });
  return MonAn;
};