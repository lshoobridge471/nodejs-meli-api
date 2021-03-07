import dotenv from 'dotenv';

// Initialize the dotenv CONFIG (parse environment variables).
dotenv.config();

const {
    SERVER_HOST = 'localhost',
    SERVER_PORT = '3000',
    MELIAPI_URL = 'https://api.mercadolibre.com'
} = process.env;

const CONFIG = {
    SERVER_HOST,
    SERVER_PORT,
    MELIAPI_URL
};

export default CONFIG;