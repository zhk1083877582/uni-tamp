import dt from '@dt/dt'

const env = {
  dev: {
    dtUrl: 'http://172.16.1.126:8100'
  },
  test: {
    dtUrl: 'https://dtwgwtest.tospur.com'
  },
  uat: {
    dtUrl: 'https://dtgwuat-new.tospurfang.com'
  },
  prod: {
    dtUrl: 'https://dtgw.tospurfang.com'
  }
}

let config = {
  id: 36,
  name: 'DT-NOTE',
  version: import.meta.env.VITE_BUILD_VERSION,
  buildTime: import.meta.env.VITE_BUILD_DATE,
  env: import.meta.env.VITE_ENV
}

if (import.meta.env.DEV) {
  Object.assign(dt.env, config, env.uat)
} else {
  Object.assign(dt.env, config, env[import.meta.env.VITE_ENV])
}
console.log(dt)
