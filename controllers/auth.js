const service = require('../services/auth');

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ success: false, message: 'Thiếu thông tin đăng ký' });
    return;
  }
  try {
    const result = await service.register(username, password);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ success: false, message: 'Thiếu thông tin đăng nhập' });
    return;
  }
  try {
    const result = await service.login(username, password);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  register,
  login
}