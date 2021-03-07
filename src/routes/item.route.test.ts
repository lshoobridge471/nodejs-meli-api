import { Request, Response } from 'express';
import ItemRoute from './item.route';
import ItemDataMock from './__mocks__/item.route.mock';

describe(' test suite', () => {
    const request: Partial<Request> = {
        params: {
            id: "33"
        }
    };
    const response: Partial<Response> = {
        json: jest.fn()
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('item route test suite', async () => {
        await ItemRoute(request as Request, response as Response);
        expect(response.json).toHaveBeenCalled();
    });
});