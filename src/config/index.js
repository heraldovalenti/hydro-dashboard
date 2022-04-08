import defaultConfig from './default';
import development from './development';
import production from './production';
import test from './test';
import staging from './staging';
import local from './local';

const environmentConfig = {
  development,
  production,
  test,
  staging,
  local,
};

const config = {
  ...defaultConfig,
  ...environmentConfig[process.env.REACT_APP_ENV],
};

export default config;
