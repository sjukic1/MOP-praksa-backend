import { sign, verify } from 'jsonwebtoken';

import { JWT_SECRET } from '../../config/constants';

const createTokens = (user) => {
  const accessToken = sign({ username: user.username, id: user.id }, JWT_SECRET);
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookie['access-token'];

  if (!accessToken) {
    return res.status(400).josn({ error: 'User not authenticated!' });
  }

  try {
    const validToken = verify(accessToken, JWT_SECRET);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

export { createTokens, validateToken };
