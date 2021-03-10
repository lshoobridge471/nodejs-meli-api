import { Request, Response } from 'express';
import { defaultJSONResponse, parseMELIAPIItemURL, parseMELIAPIItemDescriptionURL, parseProductDetailData } from '../utils/utils';
import { IProductDetailData, JSONResponse } from '../types/interfaces';
import axios, { AxiosError, AxiosResponse } from 'axios';

const ItemRoute = async (req: Request, res: Response): Promise<void> => {
    // Default response.
    let jsonResponse: JSONResponse = defaultJSONResponse();

    // Obtain the "q" parameter as a query string to find.
    const id: string = req.params?.id && req.params.id;

    // Parse the MELI URL Item detail endpoint
    const urlDetail: string = parseMELIAPIItemURL(id);
    // Parse the MELI URL Item description endpoint
    const urlDescription: string = parseMELIAPIItemDescriptionURL(id);

    // Generate calls to the urls (products & description)
    // eslint-disable-next-line
    const calls: Promise<AxiosResponse<any>>[] = [
        axios.get(urlDetail),
        axios.get(urlDescription),
    ];
    // Call all the urls provided.
    await axios.all(calls).then(axios.spread((...responses: AxiosResponse[]): void => {
        // Get necesary data.
        const productData: IProductDetailData = parseProductDetailData(responses[0].data);
        jsonResponse = {
            ...jsonResponse,
            ...productData,
            description: responses[1].data.plain_text
        };
    })).catch((error: AxiosError): void => {
        // Parse error into a message.
        jsonResponse.message = error.message;
    })
    res.json(jsonResponse);
};

export default ItemRoute;