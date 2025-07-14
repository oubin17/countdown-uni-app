import { createSSRApp } from "vue";
import uviewPlus from 'uview-plus'
import App from "./App.vue";
// 引入 uView UI

export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus)
  return {
    app,
  };
}
