import { Storage } from '@google-cloud/storage';
import { v4 as uuid } from 'uuid';
import { format } from 'util';

import { BUCKET_NAME, CACHE_CONTROL, FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL } from '../../config/constants';

const storage = new Storage({
  credentials: {
    project_id: FIREBASE_PROJECT_ID,
    private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: FIREBASE_CLIENT_EMAIL,
  },
});

const bucket = storage.bucket(BUCKET_NAME);

const uploadFile = async (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(`No file found ${file.originalname}`);
    }
    const newFileName = `${Date.now() + '_' + file.originalname}`;

    const fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      gzip: true,
      metadata: {
        cacheControl: CACHE_CONTROL,
        metadata: {
          firebaseStorageDownloadTokens: uuid(),
        },
      },
    });

    blobStream.on('error', (error) => {
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
      resolve(url);
    });

    return blobStream.end(file.buffer);
  });
};
export { uploadFile };
