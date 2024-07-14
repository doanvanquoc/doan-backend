const monAnService = require('../services/mon_an');

const layDanhSachMonAnPhanTrang = async (req, res) => {
  try {
    const { page, limit } = req.query;
    if ((page != 0 && !page) || (limit != 0 && !limit)) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' })
    }
    const result = await monAnService.layDanhSachMonAnPhanTrang(page, limit);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const layMonAnTheoDanhMuc = async (req, res) => {
  try {
    const id_danh_muc = req.params.id
    if (id_danh_muc != 0 && !id_danh_muc) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' })
    }
    const result = await monAnService.layMonAnTheoDanhMuc(id_danh_muc);
    res.json(result)
  } catch (error) {
    res.json(error);
  }
}

const datMon = async (req, res) => {
  try {
    const {hoa_don, danh_sach_cthd} = req.body
    if (!hoa_don || !danh_sach_cthd) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' })
    }
    const result = await monAnService.datMon(hoa_don, danh_sach_cthd, req.user.tai_khoan);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const layDanhSachMonAn = async (req, res) => {  
  try {
    const result = await monAnService.layDanhSachMonAn();
    res.json(result);
  } catch (error) {
    res.json(error);
  }
} 

const themMonVaoHoaDonDaCo = async (req, res) => {
  try {
    const {id_hoa_don, danh_sach_cthd} = req.body
    if (!id_hoa_don || !danh_sach_cthd) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' })
    }
    const result = await monAnService.themMonVaoHoaDonDaCo(id_hoa_don, danh_sach_cthd, req.user.tai_khoan);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const capNhatTrangThaiMonAn = async (req, res) => {
  try {
    const {id_mon_an, trang_thai} = req.body
    if (!id_mon_an || (trang_thai != 0 && !trang_thai)) {
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' })
    }
    const result = await monAnService.capNhatTrangThaiMonAn(trang_thai, id_mon_an);
    res.json(result);
  } catch (error) {
    res.json(error)
  }
}

const themMonAn = async (req, res) => {
  try {
    const result = await monAnService.themMonAn(req.body, req.file.filename);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const capNhatMonAn = async (req, res) => {
  try {
    const result = await monAnService.capNhatMonAn(req.params.id, req.body, req.file.filename);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const capNhatMonAnKhongHinhAnh = async (req, res) => {
  try {
    const result = await monAnService.capNhatMonAnKhongHinhAnh(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const xoaMonAn = async (req, res) => {
  try {
    const result = await monAnService.xoaMonAn(req.params.id);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  layDanhSachMonAnPhanTrang,
  layMonAnTheoDanhMuc,
  layDanhSachMonAn,
  datMon,
  themMonVaoHoaDonDaCo,
  capNhatTrangThaiMonAn,
  themMonAn,
  capNhatMonAn,
  capNhatMonAnKhongHinhAnh,
  xoaMonAn
}