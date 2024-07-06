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
      TaiKhoan.belongsTo(models.ChucVu, {
        foreignKey: 'id_chuc_vu',
        as: 'chuc_vu'
      });
      TaiKhoan.hasMany(models.ChiTietHoaDon, {
        foreignKey: 'tai_khoan',
        as: 'chi_tiet_hoa_don'
      });
      TaiKhoan.hasMany(models.HoaDon, {
        foreignKey: 'thu_ngan',
        as: 'hoa_don'
      });
      TaiKhoan.hasMany(models.ThongKeChi, {
        foreignKey: 'tai_khoan',
        as: 'chi'
      });
      TaiKhoan.hasMany(models.ThongKeThu, {
        foreignKey: 'tai_khoan',
        as: 'thu'
      }); 
      TaiKhoan.belongsTo(models.CaLamViec, {
        foreignKey: 'ca_lam_viec',
        as: 'ca'
      });
      TaiKhoan.hasMany(models.ChiTietCaLamViec, {
        foreignKey: 'tai_khoan',
        as: 'nhan_vien'
      });
      TaiKhoan.belongsTo(models.ChiNhanh, {
        foreignKey: 'chi_nhanh',
        as: 'chi_nhanh_lam_viec'
      });
    }
  }
  TaiKhoan.init({
    tai_khoan: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    mat_khau: DataTypes.STRING,
    id_chuc_vu: DataTypes.INTEGER,
    email: DataTypes.STRING,
    ten_hien_thi: DataTypes.STRING,
    ca_lam_viec: DataTypes.INTEGER,
    trang_thai: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    
    },
    chi_nhanh: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'TaiKhoan',
    tableName: 'tai_khoan'
  });
  return TaiKhoan;
};