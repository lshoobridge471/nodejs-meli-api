import { JSONResponse } from "../types/interfaces";
import CONFIG from "../config/config";
import {
    toInteger,
    parseMELIAPISearchURL,
    parseMELIAPIItemURL,
    parseMELIAPIItemDescriptionURL,
    defaultJSONResponse,
    createExpressApp,
    addAppRoute
} from "./utils";
import ItemsRoute from "../routes/items.route";
import express, { Express, Router } from 'express';

describe('utils test suite', () => {
    const defaultItemID = '33bb123';
    const jSONResponse: JSONResponse = {
        author: {
            name: CONFIG.AUTHOR_NAME,
            lastname: CONFIG.AUTHOR_LASTNAME,
        },
    };

    it('test toInteger', () => {
        const num: number = toInteger("3");
        expect(num).toEqual(3);
    });

    it('test parseMELIAPISearchURL', () => {
        const query = 'macbook';
        const parsedUrl = parseMELIAPISearchURL(query);
        const url = `${CONFIG.MELIAPI_URL}/sites/MLA/search?q=${query}`;
        expect(parsedUrl).toEqual(url);
    });

    it('test parseMELIAPIItemURL', () => {
        const parsedUrl = parseMELIAPIItemURL(defaultItemID);
        const url = `${CONFIG.MELIAPI_URL}/items/${defaultItemID}`;
        expect(parsedUrl).toEqual(url);
    });

    it('test parseMELIAPIItemDescriptionURL', () => {
        const parsedUrl = parseMELIAPIItemDescriptionURL(defaultItemID);
        const url = `${CONFIG.MELIAPI_URL}/items/${defaultItemID}/description`;
        expect(parsedUrl).toEqual(url);
    });

    it('test defaultJSONResponse', () => {
        const utilResponse: JSONResponse = defaultJSONResponse();
        expect(utilResponse).toEqual(jSONResponse);
    });

    it('test createExpressApp', () => {
        const router: Router = Router();
        const app: Express = createExpressApp(router);
        const mockApp: Express = express();

        mockApp.use(router);
        // Parse string
        const routerStackApp: string = JSON.stringify(app._router.stack);
        const routerStackMockApp: string = JSON.stringify(mockApp._router.stack);
        // Test
        expect(routerStackApp).toStrictEqual(routerStackMockApp);
    });

    it('test addAppRoute', () => {
        const router = Router();
        const app: Express = createExpressApp(router);
        addAppRoute(app, '/items', ItemsRoute);
        // Check last item added
        const lastItem = app._router.stack.slice(-1).pop();
        expect(lastItem.name).toEqual(ItemsRoute.name);
    });
});