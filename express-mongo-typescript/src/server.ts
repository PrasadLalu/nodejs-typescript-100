import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
const app = express();
const port = process.env.port || 3000;

mongoose
    .connect(config.mongo.url)
    .then(() => {
        console.log('connected');
        StartServer();
    })
    .catch((error)=> {
        console.log(error);
    });


/**Start server only if database connected. */
const StartServer = () => {
    app.use((req, res, next) => {
        console.log(`Incomming - METHOD: [${req.method}]-URL:[${req.url}]-IP:[${req.socket.remoteAddress}]`);
        res.on('finish', () => {
        console.log(`Incomming - METHOD: [${req.method}]-URL:[${req.url}]-IP:[${req.socket.remoteAddress}]-STATUS:[${res.statusCode}]`);
        });
        next();
    });

    app.use(express.urlencoded({ extended: true}));
    app.use(express.json());

    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /**Routes */

    /** Healthcheck */
    app.get('/ping', (req, res, next) => res.status(200).json({ message: 'Hello World' }));

    /** Connect to server */
    http.createServer(app).listen(port, () => console.log(`Server listening on port:${port}`));
}