import bcrypt from 'bcrypt';

import db from '../../lib/db/';
import { createTokens, validateToken } from '../../lib/helpers/jwt';

import { JWT_EXPIRE_TIME_TOKEN } from '../../config/constants';

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await db.User.findOne({ where: { username } });

    if (!userFound) {
      res.status(400).json({ error: "User Doesn't Exist" });
    } else {
      const dbPassword = userFound.dataValues.password;

      const match = await bcrypt.compare(password, dbPassword);

      if (!match) {
        res.status(400).json({ error: 'Wrong Username and Password Combination!' });
      } else {
        const accessToken = createTokens(userFound);

        res.cookie('access-token', accessToken, {
          maxAge: JWT_EXPIRE_TIME_TOKEN,
          httpOnly: true,
        });

        res.status(200).json({ message: 'Success login!' });
      }
    }
  } catch (err) {
    if (err) {
      res.status(400).json({ error: err });
    }
  }
};

export const signUp = async (req, res) => {
  const { username, name, surname, password, description } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {
    const newUser = await db.User.create({
      username: username,
      name: name,
      surname: surname,
      password: hash,
      description: description,
      dateOfRegistration: Date.now(),
    });

    if (newUser) {
      res.status(200).json({ message: 'User registered!' });
    }
  } catch (err) {
    if (err) {
      res.status(400).json({ error: err });
    }
  }
};

export default {
  login,
  signUp,
};
