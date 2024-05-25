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
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW
    },
    gio_ra: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW
    },
    tong_tien: DataTypes.DECIMAL(10, 2),
    chiet_khau: DataTypes.DOUBLE,
    phuong_thuc_thanh_toan: DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'HoaDon',
    tableName: 'hoa_don'
  });
  return HoaDon;
};