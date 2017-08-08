import cookie from 'react-cookies';
import config from '../config';

const rootURI = config.API_HTTPS_URL;

const getFullPath = (path) => {
    return `${rootURI}/${cookie.load('indaba-realm')}/v0.2/${path}`;
};

export default getFullPath;
