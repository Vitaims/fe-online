/*
 * @Author: 陈富贵
 * @Date: 2024-03-06 17:34:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-03-06 22:15:43
 * @Description: 请填写简介
 */
import { createApp } from 'vue'
// import './style.css'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'


const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')