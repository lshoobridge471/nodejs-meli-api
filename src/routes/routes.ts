import { AddRouteProps } from '../types/interfaces';
import ItemsRoute from './items.route';
import ItemRoute from './item.route';

// Define routes
const routes: Omit<AddRouteProps, 'router'>[] = [{
        path: "/items",
        handler: ItemsRoute
    },
    {
        path: ["/item/:id", "/items/:id/description"],
        handler: ItemRoute
    },
];

export default routes;