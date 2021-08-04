import { Op } from 'sequelize';

import db from '../../lib/db/';
import { getPagedData, getPagedMetaData } from '../../lib/helpers/pagination';
import { uploadFile } from '../../lib/helpers/firebaseUploadHelper';
import { getOrderQuery, getDurationQuery } from '../../lib/helpers/queryVideo';
import { getUserIdFromToken } from '../../lib/helpers/jwt';

export const getPagedVideos = async (req, res) => {
  try {
    const { page, size, category, order, duration } = req.query;

    const { limit, offset } = getPagedMetaData(page, size);

    const durationBegin = duration ? +getDurationQuery(duration).first[0] : null;
    const durationEnd = duration ? +getDurationQuery(duration).last[0] : null;
    const orderValue = order ? getOrderQuery(order) : null;

    let videos = null;

    if (category) {
      if (orderValue && durationBegin) {
        videos = await db.Video.findAndCountAll({
          where: { categoryVideoId: category, videoDuration: { [Op.between]: [durationBegin, durationEnd] } },
          order: [[orderValue, 'DESC']],
          limit,
          offset,
        });
      } else if (orderValue) {
        videos = await db.Video.findAndCountAll({
          where: { categoryVideoId: category },
          order: [[orderValue, 'DESC']],
          limit,
          offset,
        });
      } else if (durationBegin) {
        videos = await db.Video.findAndCountAll({
          where: { categoryVideoId: category, videoDuration: { [Op.between]: [durationBegin, durationEnd] } },
          limit,
          offset,
        });
      } else {
        videos = await db.Video.findAndCountAll({
          where: { categoryVideoId: category },
          limit,
          offset,
        });
      }
    } else {
      if (orderValue && durationBegin) {
        videos = await db.Video.findAndCountAll({
          where: { videoDuration: { [Op.between]: [durationBegin, durationEnd] } },
          order: [[orderValue, 'DESC']],
          limit,
          offset,
        });
      } else if (orderValue) {
        videos = await db.Video.findAndCountAll({
          order: [[orderValue, 'DESC']],
          limit,
          offset,
        });
      } else if (durationBegin) {
        videos = await db.Video.findAndCountAll({
          where: { videoDuration: { [Op.between]: [durationBegin, durationEnd] } },
          limit,
          offset,
        });
      } else {
        videos = await db.Video.findAndCountAll({
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

export const getVideoById = async (req, res) => {
  try {
    const videoId = req.params.id;

    const video = await db.Video.findByPk(videoId);

    if (video) {
      video.views = +video.views + 1;

      await video.save();

      res.status(200).json(video);
    } else {
      res.status(422).json({ message: `Can't find video by id = ${videoId}` });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const insertVideo = async (req, res) => {
  try {
    const { title, description, category, duration } = req.body;

    const files = req.files;

    if (!files.video[0].mimetype.includes('video')) {
      res.status(422).json({ message: 'Please select valid format for video' });
    } else if (!files.thumbnail[0].mimetype.includes('image')) {
      res.status(422).json({ message: 'Please select valid format for thumbnail image' });
    } else {
      const videoUrl = await uploadFile(files.video[0]);

      const userId = getUserIdFromToken(req.headers['authorization']);

      const video = await db.Video.create({
        title: title,
        url: videoUrl,
        thumbnail: await uploadFile(files.thumbnail[0]),
        views: 0,
        videoDuration: duration,
        description: description,
        uploadDate: Date.now(),
        UserId: userId,
        categoryVideoId: category,
      });

      if (video) {
        res.status(200).json({ message: 'Successfully created new video!' });
      }
    }
  } catch (err) {
    if (err) {
      res.status(500).json({ error: err });
    }
  }
};

export const updateVideo = async (req, res) => {
  try {
    const id = req.params.id;

    const { title, description, category, duration } = req.body;

    const files = req.files;

    const video = await db.Video.findByPk(id);

    let check = true;

    if (!video) {
      res.status(422).json({ message: `Can't find video by id = ${id}` });
    } else {
      video.title = title;
      if (files.video && files.video[0].mimetype.includes('video')) {
        video.url = await uploadFile(files.video[0]);
      } else {
        check = false;
        res.status(422).json({ message: 'Please select valid format for video' });
      }
      if (files.thumbnail && files.thumbnail[0].mimetype.includes('image')) {
        video.thumbnail = await uploadFile(files.thumbnail[0]);
      } else {
        check = false;
        res.status(422).json({ message: 'Please select valid format for thumbnail image' });
      }
      video.videoDuration = duration;
      video.description = description;
      video.categoryVideoId = category;

      if (check) {
        await video.save();
        res.status(200).json({ message: 'Successfully updated video' });
      }
    }
  } catch (err) {
    if (err) {
      res.status(500).json({ error: err });
    }
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const id = req.params.id;

    const video = await db.Video.findByPk(id);

    if (!video) {
      res.status(422).json({ message: `Can't find video by id = ${id}` });
    } else {
      await video.destroy();

      res.status(200).json({ message: 'Successfully deleted video' });
    }
  } catch (err) {
    if (err) {
      res.status(500).json({ error: err });
    }
  }
};

export default {
  getPagedVideos,
  getVideoById,
  insertVideo,
  updateVideo,
  deleteVideo,
};
