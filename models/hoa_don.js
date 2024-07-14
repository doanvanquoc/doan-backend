'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HoaDon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HoaDon.hasMany(models.ChiTietHoaDon, {
        foreignKey: 'id_hoa_don',
        as: 'chi_tiet_hoa_don'
      });
      HoaDon.belongsTo(models.Ban, {
        foreignKey: 'id_ban',
        as: 'ban'
      });
      HoaDon.belongsTo(models.PhuongThucThanhToan, {
        foreignKey: 'phuong_thuc_thanh_toan',
        as: 'phuong_thuc'
      });
      HoaDon.belongsTo(models.ChiNhanh, {
        foreignKey: 'chi_nhanh',
        as: 'chi_nhanh_lam_viec'
      });
      HoaDon.belongsTo(models.TaiKhoan, {
        foreignKey: 'thu_ngan',
        as: 'tai_khoan'
      });
    }
  }
  HoaDon.init({
    id_hoa_don: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    thu_ngan: DataTypes.STRING,
    id_ban: DataTypes.INTEGER,
    ngay: {
      type: DataTypes.DATE,
      //defaultValue is now
      defaultValue: DataTypes.NOW
    },
    gio_vao: {
      type: DataTypes.TIME
    },
    gio_ra: {
      type: DataTypes.TIME
    },
    tong_tien: DataTypes.DECIMAL(10, 2),
    chiet_khau: DataTypes.DOUBLE,
    ghi_chu: DataTypes.STRING,
    phuong_thuc_thanh_toan: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    trang_thai: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    chi_nhanh: {
      type: DataTypes.INTEGER,
    }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'HoaDon',
    tableName: 'hoa_don'
  });
  return HoaDon;
};