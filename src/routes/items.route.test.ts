import { Request, Router } from 'express';
import { createExpressApp, parseMELIAPISearchURL, addAppRoute } from '../utils/utils';
import moxios from 'moxios';
import request, { Response as SuperTestResponse, } from 'supertest';
import ItemsRoute from './items.route';

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

    const mockedResponse = {
        id: 33,
        name: "Macbook PRO.",
    };

    it('items route test fetch mocked data', async () => {
        // Parse URL of MELI Product Detail
        const urlSearch = parseMELIAPISearchURL(mockRequest.query?.q as string);

        // Mock responses
        moxios.stubRequest(urlSearch, {
            status: 200,
            response: mockedResponse
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
        expect(mockedResponse).toEqual(jsonResponse.data);
        // Check url's called
        expect(moxios.requests.at(0).url).toBe(urlSearch);
        expect(moxios.requests.mostRecent().url).toBe(urlSearch);
    });
});