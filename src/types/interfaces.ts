import { Router, Handler } from "express";

export interface Environment {
    NODE_ENV: string;
    SERVER_HOST: string;
    SERVER_PORT: string;
    MELIAPI_URL: string;
    AUTHOR_NAME: string;
    AUTHOR_LASTNAME: string;
}

export interface AddRouteProps {
    router: Router;
    path: string | string[];
    handler: Handler;
}

export interface AuthorInterface {
    name: string;
    lastname?: string;
}

export interface JSONResponse {
    author: AuthorInterface;
    error?: string;
    // eslint-disable-next-line
    [x: string]: any;
}