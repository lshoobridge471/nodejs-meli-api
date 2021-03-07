import express from 'express';
import { addRoute } from './utils/utils';
import { AddRouteProps } from './types/interfaces';
import routes from './routes/routes';

// Define the Express router
const expressRouter = express.Router();

// Loop the routes and add to Express Router.
routes.forEach((props: AddRouteProps) => addRoute({...props, router: expressRouter}));

export default expressRouter;