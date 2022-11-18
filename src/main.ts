import config from '@/config'
config.init()
import '@/biz'

import { createSSRApp } from "vue";
import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  };
}
