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
  }, {
    timestamps: false,
    sequelize,
    modelName: 'TaiKhoan',
    tableName: 'tai_khoan'
  });
  return TaiKhoan;
};