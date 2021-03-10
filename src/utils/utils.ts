import CONFIG from '../config/config';
import { AddRouteProps, AnyData, ICategoryPath, IProductData, IProductDetailData, JSONResponse } from "../types/interfaces";
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

// Loop arrays of products and get important data.
export const parseProductsData = (products: AnyData[]): IProductData[] => {
    return products.map((item: AnyData) => {
        // Remove keys that are not necesary.
        const {
            // eslint-disable-next-line
            sold_quantity,
            ...itemData
        } = parseProductDetailData(item);
        return itemData as IProductData;
    })
};

// Loop arrays of products and get important data.
export const parseProductDetailData = (item: AnyData): IProductDetailData => {
    return {
        id: item.id as string,
        title: item.title as string,
        price: {
            currency: item.currency_id as string,
            amount: item.price as number,
            decimals: 2 as number,
        },
        condition: item.condition as string,
        free_shipping: item.shipping.free_shipping as boolean,
        picture: item.thumbnail as string,
        sold_quantity: item?.sold_quantity as number
    } as IProductDetailData;
};

// Parse category names from category objects.
export const parseCategoryNames = (categories: ICategoryPath[]): string[] => {
    return categories?.map((category: ICategoryPath) => category.name)
};