import devConfig from './development';
import stagingConfig from './staging';

let config = devConfig; // eslint-disable-line prefer-const, import/no-mutable-exports

if (process.env.NODE_ENV === 'production') {
    config = stagingConfig;
}

export default config;
