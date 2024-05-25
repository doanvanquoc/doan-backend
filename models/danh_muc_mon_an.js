'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DanhMucMonAn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DanhMucMonAn.hasMany(models.MonAn, {
        foreignKey: 'id_danh_muc',
        as: 'mon_an'
      });
    }
  }
  DanhMucMonAn.init({
    id_danh_muc: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ten_danh_muc: DataTypes.STRING,
    hinh_anh: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'DanhMucMonAn',
    tableName: 'danh_muc_mon_an'
  });
  return DanhMucMonAn;
};