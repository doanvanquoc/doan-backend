'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KhuVuc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      KhuVuc.hasMany(models.Ban, {
        foreignKey: 'id_khu_vuc',
        as: 'ban'
      });
    }
  }
  KhuVuc.init({
    id_khu_vuc: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    ten_khu_vuc: DataTypes.STRING,
    trang_thai: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'KhuVuc',
    tableName: 'khu_vuc'
  });
  return KhuVuc;
};