'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChiNhanh extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChiNhanh.hasMany(models.HoaDon, {
        foreignKey: 'chi_nhanh',
        as: 'hoa_don'
      });
      ChiNhanh.hasMany(models.ThongKeChi, {
        foreignKey: 'chi_nhanh',
        as: 'chi'
      });
      ChiNhanh.hasMany(models.ThongKeThu, {
        foreignKey: 'chi_nhanh',
        as: 'thu'
      });
      ChiNhanh.hasMany(models.KhuVuc, {
        foreignKey: 'chi_nhanh',
        as: 'khu_vuc'
      });
      ChiNhanh.hasMany(models.TaiKhoan, {
        foreignKey: 'chi_nhanh',
        as: 'nhan_vien'
      });
    }
  }
  ChiNhanh.init({
    id_chi_nhanh: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ten_chi_nhanh: DataTypes.STRING,
    dia_chi: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'ChiNhanh',
    tableName: 'chi_nhanh'
  });
  return ChiNhanh;
};