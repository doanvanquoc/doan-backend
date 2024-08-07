'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChiTietHoaDon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChiTietHoaDon.belongsTo(models.HoaDon, {
        foreignKey: 'id_hoa_don',
        as: 'hoa_don'
      });
      ChiTietHoaDon.belongsTo(models.MonAn, {
        foreignKey: 'id_mon_an',
        as: 'mon_an'
      });
      ChiTietHoaDon.belongsTo(models.TaiKhoan, {
        foreignKey: 'tai_khoan',
        as: 'nhan_vien'
      });
    }
  }
  ChiTietHoaDon.init({
    id_cthd: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_hoa_don: DataTypes.INTEGER,
    id_mon_an: DataTypes.INTEGER,
    so_luong: DataTypes.INTEGER,
    thanh_tien: DataTypes.DECIMAL(10, 2),
    ghi_chu: DataTypes.STRING,
    thoi_gian: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW
    },
    tai_khoan: DataTypes.STRING,
    trang_thai: {
      type: DataTypes.INTEGER,
      defaultValue: 1

    },
    ly_do: DataTypes.STRING,

  }, {
    timestamps: false,
    sequelize,
    modelName: 'ChiTietHoaDon',
    tableName: 'chi_tiet_hoa_don'
  });
  return ChiTietHoaDon;
};