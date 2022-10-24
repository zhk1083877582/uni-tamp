import dt from '@dt/dt';

const env = {
  dev: {},
  test: {
    dtUrl: 'https://dtwgwtest.tospur.com',
  },
  uat: {
    dtUrl: 'https://dtgwuat-new.tospurfang.com'
  },
  prod: {
    dtUrl: 'https://dtgw.tospurfang.com'
  }
}

let config = {
  dtUrl: 'http://172.16.1.126:8100',
  id: 36,
  name: 'DT-NOTE',
  version: import.meta.env.VITE_BUILD_VERSION,
  buildTime: import.meta.env.VITE_BUILD_DATE,
  env: import.meta.env.VITE_ENV
}

if (import.meta.env.DEV) {
  // config.dtUrl = 'https://dtwgwtest.tospur.com'
  // config.dtUrl = 'https://dtgwstag.tospurfang.com'
  config.dtUrl = 'https://dtgw.tospurfang.com'
  // config.dtUrl = 'http://172.16.1.126:8100'
}

Object.assign(dt.env, config, env[import.meta.env.VITE_ENV])
