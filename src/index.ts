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
const {
    SERVER_HOST = "localhost",
    SERVER_PORT = "3000"
} = process.env;

// Start the Express server
app.listen(toInteger(SERVER_PORT), SERVER_HOST, () => {
    // tslint:disable-next-line:no-console
    console.log(`NodeJS Express server started at http://${SERVER_HOST}:${SERVER_PORT}` );
});