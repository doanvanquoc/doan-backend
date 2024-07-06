'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ThongKeChi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ThongKeChi.belongsTo(models.CaLamViec, { foreignKey: 'id_ca' });
      ThongKeChi.belongsTo(models.NghiepVuChi, { foreignKey: 'id_nghiep_vu' });
      ThongKeChi.belongsTo(models.TaiKhoan, { foreignKey: 'tai_khoan' });
    }
  }
  ThongKeChi.init({
    id_chi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    so_tien: DataTypes.DECIMAL(10, 2),
    noi_dung: DataTypes.STRING,
    id_ca: DataTypes.INTEGER,
    id_nghiep_vu: DataTypes.INTEGER,
    thoi_gian: DataTypes.DATE,
    tai_khoan: DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'ThongKeChi',
    tableName: 'thong_ke_chi'
  });
  return ThongKeChi;
};