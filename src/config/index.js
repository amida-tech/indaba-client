import devConfig from './development';
import stagingConfig from './staging';

const config = devConfig;

if (process.env.NODE_ENV === 'development') {
    config = devConfig;
} else if (process.env.NODE_ENV === 'staging') {
    config = stagingConfig;
}

export default config;
