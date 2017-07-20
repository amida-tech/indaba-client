// import config from '../config';

const rootURI = 'localhost:/3005'; // config.API_HTTPS_URL;

const getFullPath = (path) => {
    return rootURI + path;
};

export default getFullPath;
