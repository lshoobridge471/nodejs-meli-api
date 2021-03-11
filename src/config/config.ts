import dotenv from 'dotenv';
import { Environment } from '../types/interfaces';

// Initialize the dotenv CONFIG (parse environment variables).
dotenv.config();

const {
    NODE_ENV = 'development',
    SERVER_HOST = 'localhost',
    SERVER_PORT = '8080',
    MELIAPI_URL = 'https://api.mercadolibre.com',
    AUTHOR_NAME = 'Lucas',
    AUTHOR_LASTNAME = 'Shoobridge'
} = process.env;

const CONFIG: Environment = {
    NODE_ENV,
    SERVER_HOST,
    SERVER_PORT,
    MELIAPI_URL,
    AUTHOR_NAME,
    AUTHOR_LASTNAME
};

export default CONFIG;