import dotenv from 'dotenv';
import { Environment } from '../types/interfaces';

// Initialize the dotenv CONFIG (parse environment variables).
dotenv.config();

const {
    NODE_ENV = 'development',
    SERVER_HOST = 'localhost',
    SERVER_PORT = '3000',
    MELIAPI_URL = 'https://api.mercadolibre.com'
} = process.env;

const CONFIG: Environment = {
    NODE_ENV,
    SERVER_HOST,
    SERVER_PORT,
    MELIAPI_URL
};

export default CONFIG;