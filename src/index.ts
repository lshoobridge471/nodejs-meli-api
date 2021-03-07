import express, { json } from 'express';
import router from './router'
import CONFIG from './config/config';
import { toInteger } from './utils/utils';

// Obtain the environments variables or the default values.
const {
    SERVER_HOST,
    SERVER_PORT
} = CONFIG;

// Initialize the Express APP.
const app = express();

app.use('/', router) // Mount the router on the Express App.
.use(json) // Use the JSON wrapper.
.listen(toInteger(SERVER_PORT), SERVER_HOST, () => { // Start the Express server
    //eslint-disable-next-line
    console.log(`NodeJS Express server started at http://${SERVER_HOST}:${SERVER_PORT}` );
});