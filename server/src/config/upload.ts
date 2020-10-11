import path from 'path';
import multer, {StorageEngine} from 'multer';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

interface IUploadConfig{
    driver: 's3' | 'disk',

    tmpFolder: string;
    uploadFolder: string;

    multer:{
        storage: StorageEngine;
    }

    config: {
        disk:{
            // storage:StorageEngine;
        };
        aws:{
            bucket: string;
        }
    }
}

export default {
    driver: process.env.STORAGE_DRIVER,

    tmpFolder,
    uploadFolder: path.resolve(tmpFolder, 'uploads'),

    multer:{
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const fileName = `${fileHash}-${file.originalname}`;

                return callback(null, fileName);
            },
        }),
    },

    config: {
        disk: {},
        aws:{
            bucket: 'nomeBucketNaAws'
        }
    }

} as IUploadConfig;
