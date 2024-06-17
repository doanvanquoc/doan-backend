'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChiTietCaLamViec extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChiTietCaLamViec.hasMany(models.HoaDon, {
        foreignKey: 'id_ban',
        as: 'hoa_don'
      });
      ChiTietCaLamViec.belongsTo(models.KhuVuc, {
        foreignKey: 'id_khu_vuc',
        as: 'khu_vuc'
      });
    }
  }
  ChiTietCaLamViec.init({
    id_chi_tiet_ca: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_ca: DataTypes.INTEGER,
    tai_khoan: DataTypes.STRING,
    so_du_dau: DataTypes.DECIMAL(10,2),
    so_du_cuoi: DataTypes.DECIMAL(10,2),
    ngay: DataTypes.DATE,
    ghi_chu: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'ChiTietCaLamViec',
    tableName: 'chi_tiet_ca_lam_viec'
  });
  return ChiTietCaLamViec;
};