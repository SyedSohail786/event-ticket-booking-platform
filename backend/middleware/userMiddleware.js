// middleware/userMiddleware.js
const jwt = require('jsonwebtoken');

const userMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'user') return res.status(403).json({ msg: 'Access denied' });
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = userMiddleware;
