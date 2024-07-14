const service = require('../services/ban');

const layDanhSachBan = async (req, res) => {
  try {
    const result = await service.layDanhSachBan();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const layBanTheoKhuVuc = async (req, res) => {
  try {
    const { id_khu_vuc } = req.params;
    if (!id_khu_vuc) {
      return res.status(400).json({ success: false, message: 'Thiếu id khu vực' });
    }
    const result = await service.layBanTheoKhuVuc(id_khu_vuc);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const capNhatTrangThaiBan = async (req, res) => {
  try {
    // console.log('req body: ', req.body);
    console.log("===================");
    const { id_ban, trang_thai } = req.body
    if (!id_ban) {
      return res.status(400).json({ success: false, message: 'Thiếu id bàn' });

    }
    const result = await service.capNhatTrangThaiBan(id_ban, trang_thai)
    res.json(result)
  } catch (error) {
    res.json(error)
  }
}

const themBan = async (req, res) => {
  try {
    const { ten_ban, id_khu_vuc } = req.body
    if (!ten_ban || !id_khu_vuc) {
      return res.status(400).json({ success: false, message: 'Thiếu thông tin' });
    }
    const result = await service.themBan(req.body)
    res.json(result)
  } catch (error) {
    res.json(error)
  }
}

const capNhatBan = async (req, res) => {
  try {
    const result = await service.capNhatBan(req.params.idBan, req.body)
    res.json(result)
  } catch (error) {
    res.json(error)
  }
}

const xoaBan = async (req, res) => {
  try {
    const { id_ban } = req.params
    if (!id_ban) {
      return res.status(400).json({ success: false, message: 'Thiếu id bàn' });
    }
    const result = await service.xoaBan(id_ban)
    res.json(result)
  } catch (error) {
    res.json(error)
  }
}

module.exports = { layDanhSachBan, layBanTheoKhuVuc, capNhatTrangThaiBan, themBan, capNhatBan, xoaBan }