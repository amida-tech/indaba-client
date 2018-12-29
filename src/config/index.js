import devConfig from './development';
import productionConfig from './production';

export default process.env.NODE_ENV === 'development' ? devConfig : productionConfig;
