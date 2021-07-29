import express from 'express';

import VideosController from '../controllers/video/controller';

import VideosValidationProps from '../controllers/video/validator';

import Helper from '../lib/helpers';
import multer from '../config/multer';
import { validateToken } from '../lib/helpers/jwt';

const videosRouter = express.Router();

const multerVideoFields = multer.fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
]);

videosRouter.get('/', validateToken, VideosValidationProps.getPagedVideos, Helper.validateErrors, VideosController.getPagedVideos);
videosRouter.get('/:id', validateToken, VideosValidationProps.getVideoById, Helper.validateErrors, VideosController.getVideoById);
videosRouter.post('/', validateToken, multerVideoFields, VideosValidationProps.insertVideo, Helper.validateErrors, VideosController.insertVideo);
videosRouter.put('/:id', validateToken, multerVideoFields, VideosValidationProps.updateVideo, Helper.validateErrors, VideosController.updateVideo);
videosRouter.delete('/:id', validateToken, VideosValidationProps.deleteVideo, Helper.validateErrors, VideosController.deleteVideo);

export default videosRouter;
