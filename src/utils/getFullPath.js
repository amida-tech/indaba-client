import cookie from 'react-cookies';
import config from '../config';

const rootURI = config.GREYSCALE_URL;

const getFullPath = (path, realm) => {
    return `${rootURI}/${realm || cookie.load('indaba-realm')}/v0.2/${path}`;
};

export default getFullPath;
