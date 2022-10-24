const pageLoader = require('./node_modules/@lr17/loader/src/load/page.js')
const paths: string[] = ['pages_com', 'pagesReport', 'pagesHouse', 'pagesUser']
pageLoader.load({
  component: {
    from: '@dt/page/com',
    paths
  },
  page: {
    from: '@dt/page/src',
    paths: ['building', 'report', 'loan', 'integral', 'article']
  }
})

const moment = require('moment')
const childProcess = require('child_process')
const buildDate = `${moment(new Date()).format("YYYYMMDD")}`
const version = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().replace(
  /\s+/, '').split('-').pop().split('/').pop()

import pathLoader from './node_modules/@lr17/loader/src/load/path.js'

import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
const pathLoaderPlugin: any = pathLoader({ paths })

process.env.VITE_BUILD_DATE = buildDate
process.env.VITE_BUILD_VERSION = version

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    pathLoaderPlugin
  ],
  css: {
    preprocessorOptions: { 
      scss: {
        additionalData: `@import "@/style/main.scss";`,
      }
    }
  },
});
