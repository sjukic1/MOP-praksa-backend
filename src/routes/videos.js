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

/**
 * @swagger
 * paths:
 *  /api/v1/videos:
 *    get:
 *      tags:
 *        - "Videos"
 *      description: Get all videos
 *      security:
 *        - Bearer: []
 *      parameters:
 *        - in: query
 *          name: category
 *        - in: query
 *          name: size
 *        - in: query
 *          name: page
 *        - in: query
 *          name: order
 *        - in: query
 *          name: duration
 *        - in: query
 *          name: q
 *      responses:
 *        200:
 *          description: Return all videos pagged!
 *        422:
 *          description: Select valid format for video and thumbnail!
 *        500:
 *          description: Server error!
 */
videosRouter.get('/', validateToken, VideosValidationProps.getPagedVideos, Helper.validateErrors, VideosController.getPagedVideos);
/**
 * @swagger
 * paths:
 *  /api/v1/videos/{id}:
 *    get:
 *      tags:
 *        - "Videos"
 *      description: Get video by id
 *      parameters:
 *        - in: path
 *          name: id
 *          type: integer
 *      security:
 *        - Bearer: []
 *      responses:
 *        200:
 *          description: Successfully returned video!
 *        422:
 *          description: Can't find video!
 *        500:
 *          description: Server error!
 */
videosRouter.get('/:id', validateToken, VideosValidationProps.getVideoById, Helper.validateErrors, VideosController.getVideoById);
/**
 * @swagger
 * paths:
 *  /api/v1/videos:
 *    post:
 *      tags:
 *        - "Videos"
 *      description: Update user informations
 *      security:
 *        - Bearer: []
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: formData
 *          name: video
 *          type: file
 *          description: Select .mp4 file to upload.
 *        - in: formData
 *          name: thumbnail
 *          type: file
 *          description: Select .jpeg, .jpg file to upload.
 *        - in: formData
 *          name: title
 *          type: string
 *        - in: formData
 *          name: description
 *          type: string
 *        - in: formData
 *          name: category
 *          type: integer
 *        - in: formData
 *          name: duration
 *          type: number
 *      responses:
 *        200:
 *          description: Successfully created new video!
 *        422:
 *          description: Select valid format for video and thumbnail!
 *        500:
 *          description: Server error!
 */
videosRouter.post('/', validateToken, multerVideoFields, VideosValidationProps.insertVideo, Helper.validateErrors, VideosController.insertVideo);
/**
 * @swagger
 * paths:
 *  /api/v1/videos/{id}:
 *    put:
 *      tags:
 *        - "Videos"
 *      description: Update user informations
 *      security:
 *        - Bearer: []
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: path
 *          name: id
 *          type: integer
 *        - in: formData
 *          name: video
 *          type: file
 *          description: Select .mp4 file to upload.
 *        - in: formData
 *          name: thumbnail
 *          type: file
 *          description: Select .jpeg, .jpg file to upload.
 *        - in: formData
 *          name: title
 *          type: string
 *        - in: formData
 *          name: description
 *          type: string
 *        - in: formData
 *          name: category
 *          type: integer
 *        - in: formData
 *          name: duration
 *          type: number
 *      responses:
 *        200:
 *          description: Successfully updated new video!
 *        422:
 *          description: Select valid format for video and thumbnail!
 *        500:
 *          description: Server error!
 */
videosRouter.put('/:id', validateToken, multerVideoFields, VideosValidationProps.updateVideo, Helper.validateErrors, VideosController.updateVideo);
/**
 * @swagger
 * paths:
 *  /api/v1/videos/{id}:
 *    delete:
 *      tags:
 *        - "Videos"
 *      description: Delete video by id
 *      parameters:
 *        - in: path
 *          name: id
 *          type: integer
 *      security:
 *        - Bearer: []
 *      responses:
 *        200:
 *          description: Successfully deleted video!
 *        422:
 *          description: Can't find video!
 *        500:
 *          description: Server error!
 */
videosRouter.delete('/:id', validateToken, VideosValidationProps.deleteVideo, Helper.validateErrors, VideosController.deleteVideo);

export default videosRouter;
