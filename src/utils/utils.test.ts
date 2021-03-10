import { ICategoryPath, IProductData, IProductDetailData, JSONResponse } from "../types/interfaces";
import CONFIG from "../config/config";
import {
    toInteger,
    parseMELIAPISearchURL,
    parseMELIAPIItemURL,
    parseMELIAPIItemDescriptionURL,
    defaultJSONResponse,
    createExpressApp,
    addAppRoute,
    parseProductsData,
    parseProductDetailData,
    parseCategoryNames
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

    // TODO: make tests.
    // eslint-disable-next-line
    const mockedResults: Array<any> = [
        {
            id: "1",
            title: "title 1",
            currency_id: "ARS",
            price: 2324,
            codition: "new",
            shipping: {
                free_shipping: true,
            },
            thumbnail: "https://mercadolibre.com.ar/images/hello1.png",
            sold_quantity: 1,
        },
        {
            id: "2",
            title: "title 2",
            currency_id: "ARS",
            price: 2526,
            codition: "new",
            shipping: {
                free_shipping: true,
            },
            thumbnail: "https://mercadolibre.com.ar/images/hello2.png",
            sold_quantity: 2,
        },
    ];

    const mockParsedItems: IProductData[] = [{
        id: '1',
        title: 'title 1',
        price: { currency: 'ARS', amount: 2324, decimals: 2 },
        condition: undefined,
        free_shipping: true,
        picture: 'https://mercadolibre.com.ar/images/hello1.png'
    },
    {
        id: '2',
        title: 'title 2',
        price: { currency: 'ARS', amount: 2526, decimals: 2 },
        condition: undefined,
        free_shipping: true,
        picture: 'https://mercadolibre.com.ar/images/hello2.png'
    }];

    it('test parseProductsData', () => {
        const parsedItems = parseProductsData(mockedResults);
        expect(parsedItems).toEqual(mockParsedItems);
    });

    it('test parseProductDetailData', () => {
        const mockedParsedItem: IProductDetailData = {
            id: '2',
            title: 'title 2',
            price: { currency: 'ARS', amount: 2526, decimals: 2 },
            condition: undefined,
            free_shipping: true,
            picture: 'https://mercadolibre.com.ar/images/hello2.png',
            sold_quantity: 2
        };
        const parsedItem = parseProductDetailData(mockedResults[1]);
        expect(parsedItem).toEqual(mockedParsedItem);
    });
    
    it('test parseCategoryNames', () => {
        const mockedCategories: ICategoryPath[] = [
            { id: "1", name: "Categ 1"},
            { id: "2", name: "Categ 2"},
            { id: "3", name: "Categ 3"},
        ];
        const mockedParsedCategories: string[] = [
            "Categ 1",
            "Categ 2",
            "Categ 3",
        ];
        const parsedNames: string[] = parseCategoryNames(mockedCategories);
        expect(parsedNames).toEqual(mockedParsedCategories);
    });
});