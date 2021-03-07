import { Router } from 'express';
import { addRoute } from './utils/utils';
import { AddRouteProps } from './types/interfaces';
import routes from './routes/routes';

// Define the Express router
const router = Router();

// Loop the routes and add to Express Router.
routes.forEach((props: AddRouteProps) => addRoute({...props, router }));

export default router;