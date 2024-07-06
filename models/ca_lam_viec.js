'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CaLamViec extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CaLamViec.hasMany(models.ChiTietCaLamViec, {
        foreignKey: 'id_ca',
        as: 'chi_tiet_ca'
      });
      CaLamViec.hasMany(models.ThongKeThu, {
        foreignKey: 'id_ca',
        as: 'thong_ke_thu'
      });
      CaLamViec.hasMany(models.ThongKeChi, {
        foreignKey: 'id_ca',
        as: 'thong_ke_chi'
      });
      CaLamViec.hasMany(models.TaiKhoan, {
        foreignKey: 'ca_lam_viec',
        as: 'ca'
      });
    }
  }
  CaLamViec.init({
    id_ca: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ten_ca: DataTypes.STRING,
    bat_dau: DataTypes.TIME,
    ket_thuc: DataTypes.TIME,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'CaLamViec',
    tableName: 'ca_lam_viec'
  });
  return CaLamViec;
};