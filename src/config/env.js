/*
 * @Descripttion: Do not Edit
 * @version: 
 * @Author: mmzhang
 * @Date: 2021-09-03 10:21:17
 * @LastEditTime: 2021-09-06 09:27:26
 */
import dt from '@dt/dt';

let config = {
  dtUrl: 'http://172.16.1.126:8100',
  id: 36,
  name: 'DT-XCX',
  version: '__version__',
  buildTime: '__build_time__',
  env: '__env__'
}

if (process.env.NODE_ENV == 'development') {
  config.dtUrl = 'https://dtwgwtest.tospur.com'
  // config.dtUrl = 'https://dtgwstag.tospurfang.com'
  // config.dtUrl = 'https://dtgw.tospurfang.com'
  // config.dtUrl = 'http://172.16.1.126:8100'
}

let dev = {}

let test = {
  dtUrl: 'https://dtwgwtest.tospur.com',
}

let uat = {
  dtUrl: 'https://dtgwstag.tospurfang.com',
}

let prod = {
  dtUrl: 'https://dtgw.tospurfang.com',
}

Object.assign(config, __env__)
Object.assign(dt.env, config)
console.log(dt)