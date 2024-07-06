'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NghiepVuThu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      NghiepVuThu.hasMany(models.ChiTietCaLamViec, {
        foreignKey: 'id_ca',
        as: 'chi_tiet_ca'
      });
      
    }
  }
  NghiepVuThu.init({
    id_nghiep_vu  : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ten_nghiep_vu: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'NghiepVuThu',
    tableName: 'nghiep_vu_thu'
  });
  return NghiepVuThu;
};