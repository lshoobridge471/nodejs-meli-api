import { Request, Response } from 'express';
import { parseMELIAPISearchURL, defaultJSONResponse, parseProductsData, parseCategoryNames } from '../utils/utils';
import { JSONResponse } from '../types/interfaces';
import axios from 'axios';

const ItemsRoute = async (req: Request, res: Response): Promise<void>  => {
    // Default response.
    let jsonResponse: JSONResponse = defaultJSONResponse();

    // Obtain the "q" parameter as a query string to find.
    const query: string = req.query?.q && req.query.q.toString() || "";

    // Parse the MELI URL Search endpoint
    const url: string = parseMELIAPISearchURL(query);

    // Call to the url
    await axios.get(url)
        .then(({ data }) => {
        const {
            results,
            filters
        } = data;
        // Replace key values from results.
        const categoriesParsed = JSON.parse(JSON.stringify(filters).replace('values', 'results'));
        // Get array of strings with names of categoryes
        const categories: string[] = parseCategoryNames(categoriesParsed[0]?.results[0]?.path_from_root);
        // Parse items data
        const items = parseProductsData(results);
        // If the response is OK.
        jsonResponse = {
            ...jsonResponse,
            items,
            categories
        };
    })
    .catch(({ message }) => {
        // If the response is ERROR.
        jsonResponse.error = message;
    });
    res.json(jsonResponse);
};

export default ItemsRoute;
