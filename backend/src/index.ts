import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { createWriteStream, promises } from 'fs';
import { join } from 'path';

import poolDB from './db';

const app: Application = express();
const port = process.env.PORT || 3001;


async function createLogsDirectory() {
    try {
        await promises.access(join(__dirname, 'logs'));
    } catch (error) {
        // "logs" directory doesn't exist, create it
        await promises.mkdir(join(__dirname, 'logs'));
    } finally {
        const accessLogStream = createWriteStream(
            join(__dirname, './logs/access.log'),
            { flags: 'w' }
        );
        app.use(
            morgan(
                '\nDate: :date[iso] \nIp: :remote-addr :remote-user \nStatus: :http-version :method :url :status :response-time ms',
                {
                    stream: accessLogStream,
                },
            ),
        );

    }
}
createLogsDirectory()


// Middleware
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
    }),
);
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
    }),
);

const run = async () => {
    try {
        const connection = await poolDB.getConnection();
        if (connection) {
            app.listen(port, () => {
                console.log(`Server is running on port ${process.env.PORT}`);
            });
        }
    } catch (error) {
        console.error(error);
    }
};
run();
