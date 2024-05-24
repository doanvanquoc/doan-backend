'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaiKhoan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TaiKhoan.init({
    tai_khoan: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    mat_khau: DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'TaiKhoan',
    tableName: 'taikhoan'
  });
  return TaiKhoan;
};