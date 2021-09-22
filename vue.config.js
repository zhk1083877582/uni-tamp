const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

let env = {
  loader: path.resolve('./node_modules/@dt/loader/load/env'),
  options: {
    env: process.env.dt_env || 'dev',
  }
}

module.exports = {
  filenameHashing: true,
  lintOnSave: true,
  configureWebpack: config => {
    config.module.rules.push({
      test: path.resolve('./src/config/env.js'),
      use: [env]
    })
  },
}
