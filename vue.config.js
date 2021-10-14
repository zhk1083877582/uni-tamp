const pageLoader = require('./node_modules/@dt/loader/load/page.js')
const dirs = ['pages_com', 'pagesReport']
const pages = ['loan', 'integral']
pageLoader.load(pages, dirs, process.env.NODE_ENV == 'production' || process.env.dt_type == 'package')

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

let css = {
  loaderOptions: {
    scss: {
      prependData: `@import "./src/style/main.scss";`,
    }
  }
}

let dt_path = {
  loader: path.resolve('./node_modules/@dt/loader/load/path'),
  options: {
    dirs
  }
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
      test: /\.js$/,
      include: [path.resolve('./node_modules/@dt')],
      use: [
        'babel-loader'
      ]
    })
    config.module.rules.push({
      test: /\.js$/,
      include: [
        path.resolve('./src'),
        path.resolve('./node_modules/@dt')
      ],
      use: [dt_path]
    })
    config.module.rules.push({
      test: path.resolve('./src/config/env.js'),
      use: [env]
    })
  },
  css
}
