import devConfig from './development';
import productionConfig from './production';
import stagingConfig from './staging';

// export default process.env.NODE_ENV === 'production' ? productionConfig : devConfig;

let config = '';

if (process.env.NODE_ENV === 'production') {
    config = productionConfig;
} else if (process.env.NODE_ENV === 'staging') {
    config = stagingConfig;
} else {
    config = devConfig;
}

const defaultConfig = config;

export default defaultConfig;
