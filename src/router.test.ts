import { Express, Router } from 'express';
import router from './router';
import { createExpressApp } from './utils/utils';

describe('router test suite', () => {
    it('test routes created', () => {
        const customRouter: Router = router;
        const app: Express = createExpressApp(customRouter);
        console.log(customRouter.stack);
    });
});