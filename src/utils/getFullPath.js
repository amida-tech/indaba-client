import config from '../config';

const rootURI = config.API_HTTPS_URL;

const getFullPath = (path) => {
    return rootURI + path;
};

export default getFullPath;
