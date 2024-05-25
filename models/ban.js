'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ban extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ban.hasMany(models.HoaDon, {
        foreignKey: 'id_ban',
        as: 'hoa_don'
      });
      Ban.belongsTo(models.KhuVuc, {
        foreignKey: 'id_khu_vuc',
        as: 'khu_vuc'
      });
    }
  }
  Ban.init({
    id_ban: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    ten_ban: DataTypes.STRING,
    id_khu_vuc: DataTypes.INTEGER,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Ban',
    tableName: 'ban'
  });
  return Ban;
};