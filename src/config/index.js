import devConfig from './development';
import productionConfig from './production';

let config = devConfig; // eslint-disable-line prefer-const, import/no-mutable-exports

if (process.env.NODE_ENV === 'production') {
    config = productionConfig;
}

export default config;
