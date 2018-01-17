import config from '../config';

const rootURI = config.API_HTTPS_URL;

const getOutsidePath = (realm, path) => {
    return `${rootURI}/${realm}/v0.2/${path}`;
};

export default getOutsidePath;
