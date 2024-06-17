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
      CaLamViec.hasMany(models.HoaDon, {
        foreignKey: 'id_ban',
        as: 'hoa_don'
      });
      CaLamViec.belongsTo(models.KhuVuc, {
        foreignKey: 'id_khu_vuc',
        as: 'khu_vuc'
      });
    }
  }
  CaLamViec.init({
    id_ca: {
      type: DataTypes.INTEGER,
      primaryKey: true
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