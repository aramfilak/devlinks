import 'express-async-errors';
import express from 'express';
import { userRouter } from './user';
import { connectToDB } from './config/db';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/error-hander';
import morgan from 'morgan';
import { pathNotFound } from './middlewares/path-not-found';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/', (req, res) => {
    res.send('<h1>🔗 <a href="https://devlinks-client.vercel.app/">devlinks</a></h1>');
});

app.use('/api/v1/users', userRouter);

app.use(pathNotFound);
app.use(errorHandler);

/**_________________ RUN SERVER ______________________ */

const port = process.env.PORT || 4000;

(async function run() {
    try {
        connectToDB();
        console.log('Connection has been established successfully 🚀');

        app.listen(port, () => {
            console.log('Server listening on port', port, '🛜');
        });
    } catch (error) {
        console.error('Server crashed 💥', error);
    }
})();
