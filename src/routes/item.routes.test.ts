import { Request, Response } from 'express';
import ItemRoutes from './items.route';

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

    it('items route test suite', async () => {
        await ItemRoutes(request as Request, response as Response);
        expect(response.json).toHaveBeenCalled();
    });
});