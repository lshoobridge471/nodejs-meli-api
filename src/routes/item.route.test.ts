import { Request, Router } from 'express';
import { parseMELIAPIItemURL, parseMELIAPIItemDescriptionURL, addAppRoute, createExpressApp } from '../utils/utils';
import moxios from 'moxios';
import request, { Response as SuperTestResponse, } from 'supertest';
import ItemRoute from './item.route';

describe('item route test suite', () => {

    const mockRequest: Partial<Request> = {
        params: {
            id: "33"
        }
    };

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    const itemPath: string[] = ["/item/:id", "/items/:id/description"];

    const mockedResponseItem: Record<string, unknown> = {
        id: 33,
        name: "product name",
    };

    const mockedResponseItemDetail: Record<string, unknown> = {
        text_plain: "description text plain."
    };

    it('item route test fetch mocked data', async () => {
        // Merge response Item Detail + Description
        const mergedResponse = {...mockedResponseItem, description: mockedResponseItemDetail };

        // Parse URL of MELI Product Detail
        const urlItem = parseMELIAPIItemURL(mockRequest.params.id);
        const urlItemDetail = parseMELIAPIItemDescriptionURL(mockRequest.params.id);

        // Mock responses
        moxios.stubRequest(urlItem, {
            status: 200,
            response: mockedResponseItem
        });

        moxios.stubRequest(urlItemDetail, {
            status: 200,
            response: mockedResponseItemDetail,
        });

        // Create the router
        const router = Router();
        // Create express App.
        const app = createExpressApp(router);
        // Add app route.
        addAppRoute(app, itemPath, ItemRoute);

        // Get response.
        const response: SuperTestResponse = await request(app).get('/item/33');
        // Parse JSON response
        const jsonResponse = JSON.parse(response.text);
        // Check reponse data
        expect(mergedResponse).toEqual(jsonResponse.data);
        // Check url's called
        expect(moxios.requests.at(0).url).toBe(urlItem);
        expect(moxios.requests.at(1).url).toBe(urlItemDetail);
        expect(moxios.requests.mostRecent().url).toBe(urlItemDetail);
    });
});