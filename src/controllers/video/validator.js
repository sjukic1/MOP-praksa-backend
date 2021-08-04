import { body, param, query } from 'express-validator';

export const getPagedVideos = [
  query('page', 'Page value is not correct').isNumeric(),
  query('size', 'Size value is not correct').isNumeric(),
  query('category', 'Category value is not correct').optional().isString(),
];

export const getVideoById = [param('id', 'Id not defined').exists().isNumeric()];

export const insertVideo = [
  body('title', 'Invalid title').isString(),
  body('description', 'Invalid description').isString(),
  body('category', 'Invalid category id').isNumeric(),
  body('duration', 'Invalid duration').exists().isNumeric(),
];

export const updateVideo = [
  body('title', 'Invalid title').optional().isString(),
  body('description', 'Invalid description').optional().isString(),
  body('category', 'Invalid category id').optional().isNumeric(),
  body('duration', 'Invalid duration').optional().isNumeric(),
  param('id', 'Id not defined').exists().isNumeric(),
];

export const deleteVideo = [param('id', 'Id not defined').exists().isNumeric()];

export default {
  getPagedVideos,
  getVideoById,
  insertVideo,
  updateVideo,
  deleteVideo,
};
