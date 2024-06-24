'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ThongKeThu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ThongKeThu.belongsTo(models.CaLamViec, {foreignKey: 'id_ca'});
      ThongKeThu.belongsTo(models.NghiepVuThu, {foreignKey: 'id_nghiep_vu'});  
      ThongKeThu.belongsTo(models.TaiKhoan, {foreignKey: 'tai_khoan'});
    }
  }
  ThongKeThu.init({
    id_thu: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    so_tien: DataTypes.DECIMAL(10,2),
    noi_dung: DataTypes.STRING,
    id_ca: DataTypes.INTEGER,
    id_nghiep_vu: DataTypes.INTEGER,
    thoi_gian: DataTypes.DATE,
    tai_khoan: DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'ThongKeThu',
    tableName: 'thong_ke_thu'
  });
  return ThongKeThu;
};