import { sign, verify } from 'jsonwebtoken';

import { JWT_SECRET } from '../../config/constants';

const createTokens = (user) => {
  const accessToken = sign({ username: user.username, id: user.id }, JWT_SECRET);
  return accessToken;
};

const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(400).json({ error: 'User not authenticated!' });
  }

  try {
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(400).json({ message: 'Authorization header is missing!' });
    } else {
      const verifyToken = verify(token, JWT_SECRET);

      if (!verifyToken) {
        return res.status(400).json({ message: 'User token is corrupted' });
      } else {
        req.authenticated = true;
        return next();
      }
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getUserIdFromToken = (authHeader) => {
  try {
    const token = authHeader && authHeader.split(' ')[1];
    const verifyToken = verify(token, JWT_SECRET);
    return verifyToken.id;
  } catch (err) {
    throw err;
  }
};

export { createTokens, validateToken, getUserIdFromToken };
