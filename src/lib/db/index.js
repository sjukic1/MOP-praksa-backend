import Sequelize from 'sequelize';

import { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT, DB_NAME } from '../../config/constants';

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
});

const db = {};

db.sequelize = sequelize;

db.User = sequelize.import(__dirname + '/models/User.js');
db.Video = sequelize.import(__dirname + '/models/Video.js');
db.Categoty = sequelize.import(__dirname + '/models/Category.js');
db.Comment = sequelize.import(__dirname + '/models/Comment.js');
db.Reply = sequelize.import(__dirname + '/models/Reply.js');
db.Subscription = sequelize.import(__dirname + '/models/Subscription.js');
db.UserVideo = sequelize.import(__dirname + '/models/UserVideo.js');
db.UserComment = sequelize.import(__dirname + '/models/UserComment.js');
db.UserReply = sequelize.import(__dirname + '/models/UserReply.js');

db.User.hasMany(db.UserVideo, { as: 'userVideo' });
db.User.hasMany(db.Subscription, { as: 'userSubscription' });
db.User.hasMany(db.UserReply, { as: 'userReply' });
db.User.hasMany(db.UserComment, { as: 'userComment' });
db.Video.hasMany(db.UserVideo, { as: 'videoUser' });
db.Video.hasMany(db.Comment, { as: 'videoComment' });
db.Categoty.hasOne(db.Video, { as: 'categoryVideo' });
db.Comment.hasMany(db.UserComment, { as: 'commentUser' });
db.Comment.hasMany(db.Reply, { as: 'commentReply' });
db.Reply.hasMany(db.UserReply, { as: 'replyUser' });

export default db;
