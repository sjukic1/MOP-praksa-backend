import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

import db from '../../lib/db/';
import { getUserIdFromToken } from '../../lib/helpers/jwt';
import { createTokens, validateToken } from '../../lib/helpers/jwt';
import { getOrderQuery, getDurationQuery } from '../../lib/helpers/queryVideo';
import { getPagedData, getPagedMetaData } from '../../lib/helpers/pagination';

export const getUser = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers['authorization']);

    const user = await db.User.findByPk(userId);

    if (!user) {
      res.end(400).status({ error: 'User not found!' });
    } else {
      delete user.dataValues.password;
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers['authorization']);

    const { username, name, surname, password, description } = req.body;

    const user = await db.User.findByPk(userId);

    if (!user) {
      res.end(400).status({ error: 'User not found!' });
    } else {
      user.username = username;
      user.name = name;
      user.surname = surname;
      if (password) {
        const hash = await bcrypt.hash(password, 10);
        user.password = hash;
      }
      user.description = description;
      await user.save();
      const createAccessToken = createTokens(user);
      res.status(200).json({ message: 'Successfully updated user!', token: createAccessToken });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getUserVideos = async (req, res) => {
  try {
    const { page, size, category, order, duration } = req.query;

    const { limit, offset } = getPagedMetaData(page, size);

    const durationBegin = duration ? +getDurationQuery(duration).first[0] : null;
    const durationEnd = duration ? +getDurationQuery(duration).last[0] : null;
    const orderValue = order ? getOrderQuery(order) : null;

    const userId = getUserIdFromToken(req.headers['authorization']);

    let videos = null;

    if (category) {
      if (orderValue && durationBegin) {
        videos = await db.Video.findAndCountAll({
          where: { UserId: userId, categoryVideoId: category, videoDuration: { [Op.between]: [durationBegin, durationEnd] } },
          order: [[orderValue, 'DESC']],
          limit,
          offset,
        });
      } else if (orderValue) {
        videos = await db.Video.findAndCountAll({
          where: { UserId: userId, categoryVideoId: category },
          order: [[orderValue, 'DESC']],
          limit,
          offset,
        });
      } else if (durationBegin) {
        videos = await db.Video.findAndCountAll({
          where: { UserId: userId, categoryVideoId: category, videoDuration: { [Op.between]: [durationBegin, durationEnd] } },
          limit,
          offset,
        });
      } else {
        videos = await db.Video.findAndCountAll({
          where: { UserId: userId, categoryVideoId: category },
          limit,
          offset,
        });
      }
    } else {
      if (orderValue && durationBegin) {
        videos = await db.Video.findAndCountAll({
          where: { UserId: userId, videoDuration: { [Op.between]: [durationBegin, durationEnd] } },
          order: [[orderValue, 'DESC']],
          limit,
          offset,
        });
      } else if (orderValue) {
        videos = await db.Video.findAndCountAll({
          where: { UserId: userId },
          order: [[orderValue, 'DESC']],
          limit,
          offset,
        });
      } else if (durationBegin) {
        videos = await db.Video.findAndCountAll({
          where: { UserId: userId, videoDuration: { [Op.between]: [durationBegin, durationEnd] } },
          limit,
          offset,
        });
      } else {
        videos = await db.Video.findAndCountAll({
          where: { UserId: userId },
          limit,
          offset,
        });
      }
    }

    if (!videos) {
      res.status(200).json([]);
    } else {
      const response = getPagedData(videos, page, limit);

      res.status(200).json(response);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default {
  getUser,
  updateUser,
  getUserVideos,
};
