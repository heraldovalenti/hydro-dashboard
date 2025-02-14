import defaultConfig from './default';
import development from './development';
import production from './production';
import test from './test';
import staging from './staging';
import local from './local';
import aesServer from './aes-server';

const environmentConfig = {
  development,
  production,
  test,
  staging,
  local,
  'aes-server': aesServer,
};

const config = {
  ...defaultConfig,
  ...environmentConfig[process.env.REACT_APP_ENV],
};

export default config;
