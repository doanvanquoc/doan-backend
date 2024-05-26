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
    }
  }
  ChiTietHoaDon.init({
    id_cthd: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_hoa_don: DataTypes.INTEGER,
    id_mon_an: DataTypes.INTEGER,
    so_luong: DataTypes.INTEGER,
    thanh_tien: DataTypes.DECIMAL(10, 2),
    ghi_chu: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'ChiTietHoaDon',
    tableName: 'chi_tiet_hoa_don'
  });
  return ChiTietHoaDon;
};