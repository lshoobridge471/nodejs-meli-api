import routes from './routes';

describe('routes test suite', () => {
    it('routes test length', () => {
        expect(routes).toHaveLength(3);
    });
});