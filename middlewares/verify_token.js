const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Kết nối bị từ chối. Thiếu authorization header' });
  }
  const token = authorizationHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Kết nối bị từ chối. Thiếu header' });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user.taiKhoan;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Kết nối bị từ chối. Token không hợp lệ hoặc đã hết hạn' });
  }
}