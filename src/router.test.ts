import { Router } from 'express';
import router from './router';
import routes from './routes/routes';
import { AddRouteProps } from './types/interfaces';

describe('router test suite', () => {
    it('test routes created successfully', () => {
        const customRouter: Router = router;

        const routesNames = routes.map((route: Omit<AddRouteProps, 'router'>) => route.handler.name);
        const appRoutesNames = customRouter.stack.map((route: any) => route.name);

        expect(routesNames).toEqual(appRoutesNames);
        expect(routesNames).toHaveLength(routes.length);
        expect(appRoutesNames).toHaveLength(routes.length);
    });
});