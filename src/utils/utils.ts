import { AddRouteProps, JSONResponse } from "../types/interfaces";
import CONFIG from '../config/config';
import express, { Express, Router, Handler } from 'express';

// Function that convert string into a number.
export const toInteger = (value: string): number => parseInt(value, 0);

// Function to add route to Router.
export const addRoute = (addRouteProps: AddRouteProps): void => {
    const { router, path, handler } = addRouteProps;
    router.use(path, handler);
};

// Create Express App Route function.
export const addAppRoute = (app: Express, path: string | string[], handler: Handler): Express => {
    app._router.use(path, handler);
    return app;
};

// Create Express App
export const createExpressApp = (router: Router): Express => {
    const app: Express = express();
    app.use(router);
    return app;
};

// Function to parse MELI API Search URL.
export const parseMELIAPISearchURL = (query: string): string => `${CONFIG.MELIAPI_URL}/sites/MLA/search?q=${query}`;

// Function to parse MELI API Item ID URL.
export const parseMELIAPIItemURL = (id: string): string => `${CONFIG.MELIAPI_URL}/items/${id}`;

// Function to parse MELI API Item ID URL.
export const parseMELIAPIItemDescriptionURL = (id: string): string => `${CONFIG.MELIAPI_URL}/items/${id}/description`;

// Function to get default JSON response
export const defaultJSONResponse = (): JSONResponse => {
    const response: JSONResponse = {
        author: {
            name: CONFIG.AUTHOR_NAME,
            lastname: CONFIG.AUTHOR_LASTNAME,
        }
    };
    return response;
};