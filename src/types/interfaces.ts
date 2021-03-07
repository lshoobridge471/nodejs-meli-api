import { Router, Handler } from "express";

export interface Environment {
    NODE_ENV: string;
    SERVER_HOST: string;
    SERVER_PORT: string;
    MELIAPI_URL: string;
}

export interface AddRouteProps {
    router: Router;
    path: string | string[];
    handler: Handler;
}

export interface JSONResponse {
    status: string;
    message: string;
    data?: Record<string, unknown>;
}