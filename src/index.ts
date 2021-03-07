import express, { json } from 'express';
import dotenv from "dotenv";
import router from './router'
import { toInteger } from './utils/utils';

// Initialize the Express APP.
const app = express();

// Mount the router on the Express App.
app.use('/', router);

// Use the JSON wrapper.
app.use(json);

// Initialize the dotenv CONFIG (parse environment variables).
dotenv.config();

// Obtain the environments variables or the default values.
const host: string = process.env.SERVER_HOST || "localhost";
const port: number = toInteger(process.env.SERVER_PORT || "8080");

// Start the Express server
app.listen(port, host, () => {
    // tslint:disable-next-line:no-console
    console.log(`NodeJS Express server started at http://${host}:${port}` );
});