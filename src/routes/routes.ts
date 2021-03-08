import { AddRouteProps } from '../types/interfaces';
import ItemsRoute from './items.route';
import ItemRoute from './item.route';
import Route404 from './404.route';

// Define routes
const routes: Omit<AddRouteProps, 'router'>[] = [{
        path: "/items",
        handler: ItemsRoute
    },
    {
        path: ["/item/:id", "/items/:id/description"],
        handler: ItemRoute
    },
    {
        path: '',
        handler: Route404,
    }, 
];

export default routes;