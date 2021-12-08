const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/getEnv');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.json({ msg: 'No posee token' }).status(403);

  jwt.verify(authorization, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ msg: 'Token invalido' }).status(403);
    }
    req.token = decoded;    
    next();
  })
}