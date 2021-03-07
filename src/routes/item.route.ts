import { Request, Response } from 'express';
import { defaultJSONResponse, parseMELIAPIItemURL, parseMELIAPIItemDescriptionURL } from '../utils/utils';
import { JSONResponse } from '../types/interfaces';
import axios, { AxiosError, AxiosResponse } from 'axios';

const ItemRoute = async (req: Request, res: Response) => {
    // Default response.
    const jsonResponse: JSONResponse = defaultJSONResponse();

    // Obtain the "q" parameter as a query string to find.
    const id: string = req.params?.id && req.params.id;

    // Parse the MELI URL Item detail endpoint
    const urlDetail: string = parseMELIAPIItemURL(id);
    console.log(urlDetail);
    // Parse the MELI URL Item description endpoint
    const urlDescription: string = parseMELIAPIItemDescriptionURL(id);
    console.log(urlDescription);

    // Generate calls to the urls (products & description)
    const calls = [
        axios.get(urlDetail),
        axios.get(urlDescription),
    ];
    // Call all the urls provided.
    await axios.all(calls).then(axios.spread((...responses: AxiosResponse[]) => {
        jsonResponse.data = {
            ...responses[0].data,
            description: responses[1].data
        };
        jsonResponse.status = 'OK';
    })).catch((error: AxiosError) => {
        // Parse error into a message.
        jsonResponse.message = error.message;
    })
    res.json(jsonResponse);
};

export default ItemRoute;