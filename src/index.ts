import Server from './server';
import {configenv} from './config/configuration';

const serverIntance = new Server(configenv);

serverIntance.start();