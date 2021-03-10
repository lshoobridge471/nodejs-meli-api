import { Request, Router } from 'express';
import { createExpressApp, parseMELIAPISearchURL, addAppRoute, defaultJSONResponse as getDefaultJSONResponse } from '../utils/utils';
import moxios from 'moxios';
import request, { Response as SuperTestResponse, } from 'supertest';
import ItemsRoute from './items.route';
import { JSONResponse } from '../types/interfaces';

describe('items route test suite', () => {

    const mockRequest: Partial<Request> = {
        query: {
            q: "macbook"
        }
    };

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    const itemsPath = '/items';
    const searchItemsURL = `/items?q=${mockRequest.query?.q as string}`;

    const defaultJSONResponse: JSONResponse = getDefaultJSONResponse();

    const mockedResponse = {
        ...defaultJSONResponse,
        results: [{
            id: 33,
            title: "Macbook PRO.",
            shipping: {
                free_shipping: true
            },
            price: 33,
            currency_id: "ARS",
            condition: "new",
            thumbnail: "thumburl"
        }],
        filters: [
            {
                values: [{
                    path_from_root: [
                        {
                            id: "1",
                            name: "categ1"
                        }
                    ]
                }]
            }
        ]
    };

    const mockedParsedResponse = {
        ...defaultJSONResponse,
        items: [{
            id: mockedResponse.results[0]?.id,
            title: mockedResponse.results[0]?.title,
            price: {
                currency: mockedResponse.results[0]?.currency_id,
                amount: mockedResponse.results[0]?.price,
                decimals: 2
            },
            condition: mockedResponse.results[0]?.condition,
            free_shipping: mockedResponse.results[0]?.shipping?.free_shipping,
            picture: mockedResponse.results[0]?.thumbnail
        }],
        categories: ["categ1"]
    };

    it('items route test fetch mocked data', async () => {
        // Parse URL of MELI Product Detail
        const urlSearch = parseMELIAPISearchURL(mockRequest.query?.q as string);

        // Mock responses
        moxios.stubRequest(urlSearch, {
            status: 200,
            response: mockedResponse,
        });

        // Create the router
        const router = Router();
        // Create express App.
        const app = createExpressApp(router);
        // Add app route.
        addAppRoute(app, itemsPath, ItemsRoute);

        // Get response.
        const response: SuperTestResponse = await request(app).get(searchItemsURL);
        // Parse JSON response
        const jsonResponse = JSON.parse(response.text);
        // Check reponse data
        expect(jsonResponse).toEqual(mockedParsedResponse);
        // Check url's called
        expect(moxios.requests.at(0).url).toBe(urlSearch);
        expect(moxios.requests.mostRecent().url).toBe(urlSearch);
    });
});