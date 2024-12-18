import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "@/index.css"// 引入tailwindcss样式
import router from "@/router/router";



const app = createApp(App);
// 自动引入图标
Object.keys(ElementPlusIconsVue).forEach((key) => {
    app.component(key, ElementPlusIconsVue[key]);
});
app.use(ElementPlus, {
    locale: zhCn,
});// 挂载element-plus
app.use(router)
app.mount('#app')
