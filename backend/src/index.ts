import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { createWriteStream } from 'fs';
import { join } from 'path';

const app: Application = express();
const accessLogStream = createWriteStream(
    join(__dirname, '../logs/access.log'),
    { flags: 'a' },
);

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
    morgan(
        '\nDate: :date[iso] \nIp: :remote-addr :remote-user \nStatus: :http-version :method :url :status :response-time ms',
        {
            stream: accessLogStream,
        },
    ),
);
