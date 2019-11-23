import * as dotenv from 'dotenv';
import { IConfig } from './IConfig';

dotenv.config();
const configEnv: IConfig = {
    NODE_ENV: String(process.env.NODE_ENV),
    PORT: Number(process.env.PORT),
    BASE_URL: String(process.env.BASE_URL)
};

export let configenv = Object.freeze(configEnv);
