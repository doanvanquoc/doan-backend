'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HinhAnhMonAn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HinhAnhMonAn.belongsTo(models.MonAn, {
        foreignKey: 'id_mon_an',
        as: 'mon_an'
      });
    }
  }
  HinhAnhMonAn.init({
    id_hinh_anh: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    duong_dan: DataTypes.STRING,
    id_mon_an: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'HinhAnhMonAn',
    tableName: 'hinh_anh_mon_an'
  });
  return HinhAnhMonAn;
};