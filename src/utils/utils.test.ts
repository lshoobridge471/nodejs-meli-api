import { JSONResponse } from "../types/interfaces";
import CONFIG from "../config/config";
import {
    toInteger,
    parseMELIAPISearchURL,
    parseMELIAPIItemURL,
    parseMELIAPIItemDescriptionURL,
    defaultJSONResponse
} from "./utils";

describe('utils test suite', () => {
    const defaultItemID = '33bb123';
    const JSONResponse: JSONResponse = {
        'status': 'ERR',
        'message': '',
        'data': {},
    };

    it('test toInteger', () => {
        expect(toInteger("3")).toEqual(3);
    });
    
    it('test parseMELIAPISearchURL', () => {
        const query = 'macbook';
        const parsedUrl = parseMELIAPISearchURL(query);
        const url = `${CONFIG.MELIAPI_URL}/sites/MLA/search?q=${query}`;
        expect(parsedUrl).toEqual(url);
    });
    
    it('test parseMELIAPIItemURL', () => {
        const parsedUrl = parseMELIAPIItemURL(defaultItemID);
        const url = `${CONFIG.MELIAPI_URL}/items/${defaultItemID}`;
        expect(parsedUrl).toEqual(url);
    });
    
    it('test parseMELIAPIItemDescriptionURL', () => {
        const parsedUrl = parseMELIAPIItemDescriptionURL(defaultItemID);
        const url = `${CONFIG.MELIAPI_URL}/items/${defaultItemID}/description`;
        expect(parsedUrl).toEqual(url);
    });
    
    it('test defaultJSONResponse', () => {
        const utilResponse = defaultJSONResponse();
        expect(utilResponse).toEqual(JSONResponse);
    });
});