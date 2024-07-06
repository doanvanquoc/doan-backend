'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhuongThucThanhToan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PhuongThucThanhToan.hasMany(models.HoaDon, {
        foreignKey: 'phuong_thuc_thanh_toan',
        as: 'hoa_don'
      });
    }
  }
  PhuongThucThanhToan.init({
    id_thanh_toan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ten_phuong_thuc: DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'PhuongThucThanhToan',
    tableName: 'phuong_thuc_thanh_toan'
  });
  return PhuongThucThanhToan;
};