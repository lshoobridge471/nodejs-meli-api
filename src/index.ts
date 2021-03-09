import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './router'
import CONFIG from './config/config';
import { toInteger } from './utils/utils';

// Obtain the environments variables or the default values.
const {
    SERVER_HOST,
    SERVER_PORT,
    NODE_ENV
} = CONFIG;
const isDevelopment = NODE_ENV == 'development';

// Initialize the Express APP.
const app = express();

// Enable morgan for logging requests.
if(isDevelopment) {
    // Only add in development
    app.use(morgan('dev'));
}
app.use(cors()) // Enable cors.
app.use('/', router) // Mount the router on the Express App.
app.use(json) // Use the JSON wrapper.
.listen(toInteger(SERVER_PORT), SERVER_HOST, () => { // Start the Express server
    //eslint-disable-next-line
    console.log(`NodeJS Express server started at http://${SERVER_HOST}:${SERVER_PORT}` );
});