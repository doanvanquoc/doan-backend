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
      MonAn.belongsTo(models.DanhMucMonAn, {
        foreignKey: 'id_danh_muc',
        as: 'danh_muc'
      });
      MonAn.hasMany(models.ChiTietHoaDon, {
        foreignKey: 'id_mon_an',
        as: 'chi_tiet_hoa_don'
      });
      MonAn.belongsTo(models.ChiNhanh, {
        foreignKey: 'id_chi_nhanh',
        as: 'chi_nhanh'
      });
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
    don_vi_tinh: DataTypes.STRING,
    trang_thai: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    tinh_trang: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    hinh_anh: DataTypes.STRING,
    id_chi_nhanh: DataTypes.INTEGER 
  }, {
    timestamps: false,
    sequelize,
    modelName: 'MonAn',
    tableName: 'mon_an'
  });
  return MonAn;
};