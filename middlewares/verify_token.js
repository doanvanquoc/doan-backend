const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Access denied. Authorization header is missing.' });
  }
  const token = authorizationHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. Token is missing.' });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Access denied. Invalid token.' });
  }
}