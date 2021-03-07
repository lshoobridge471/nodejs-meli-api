import { AddRouteProps, JSONResponse } from "../types/interfaces";

const MELIAPI_URL = "https://api.mercadolibre.com";

// Function that convert string into a number.
export const toInteger = (value: string): number => parseInt(value, 0);

// Function to add route to Router.
export const addRoute = (addRouteProps: AddRouteProps): void => {
    const { router, path, handler } = addRouteProps;
    router.use(path, handler);
};

// Function to parse MELI API Search URL.
export const parseMELIAPISearchURL = (query: string): string => `${MELIAPI_URL}/sites/MLA/search?q=${query}`;

// Function to parse MELI API Item ID URL.
export const parseMELIAPIItemURL = (id: string): string => `${MELIAPI_URL}/items/${id}`;

// Function to parse MELI API Item ID URL.
export const parseMELIAPIItemDescriptionURL = (id: string): string => `${MELIAPI_URL}/items/${id}/description`;

// Function to get default JSON response
export const defaultJSONResponse = (): JSONResponse => {
    const response: JSONResponse = {
        'status': 'ERR',
        'message': '',
        'data': {},
    }
    return response;
};