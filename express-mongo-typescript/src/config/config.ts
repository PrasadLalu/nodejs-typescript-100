import dotenv from 'dotenv';
dotenv.config();
const url = 'mongodb://0.0.0.0:27017/test-db';

export const config = {
    mongo: {
        url: url
    }
}
