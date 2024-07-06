'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChucVu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChucVu.hasMany(models.TaiKhoan, {
        foreignKey: 'id_chuc_vu',
        as: 'tai_khoan'
      });
    }
  }
  ChucVu.init({
    id_chuc_vu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ten_chuc_vu: DataTypes.STRING,
    mo_ta: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'ChucVu',
    tableName: 'chuc_vu'
  });
  return ChucVu;
};