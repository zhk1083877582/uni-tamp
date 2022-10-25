import config from '@/config'
config.init()
import '@/biz'

import { createSSRApp } from "vue";
import App from "./App.vue";

import mixin from './utils/mixins/base.js'
import "@/style/iconfont.css"

export function createApp() {
  const app = createSSRApp(App)
  app.mixin(mixin)
  return {
    app,
  };
}
