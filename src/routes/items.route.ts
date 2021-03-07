import { Request, Response } from 'express';
import { parseMELIAPISearchURL, defaultJSONResponse } from '../utils/utils';
import { JSONResponse } from '../types/interfaces';
import axios, { AxiosError, AxiosResponse } from 'axios';

const ItemsRoute = async (req: Request, res: Response): Promise<void>  => {
    // Default response.
    const jsonResponse: JSONResponse = defaultJSONResponse();

    // Obtain the "q" parameter as a query string to find.
    const query: string = req.query?.q && req.query.q.toString() || "";

    // Parse the MELI URL Search endpoint
    const url: string = parseMELIAPISearchURL(query)

    // Call to the url
    await axios.get(url)
    .then((response: AxiosResponse) => {
        // If the response is OK.
        jsonResponse.data = response.data;
        jsonResponse.status = 'OK';
    })
    .catch((err: AxiosError) => {
        // If the response is ERROR.
        jsonResponse.message = err.message;
    });
    res.json(jsonResponse);
};

export default ItemsRoute;