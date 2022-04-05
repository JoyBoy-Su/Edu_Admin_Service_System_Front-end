import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import App from './App.vue';
// 引入全局样式表
import "./assets/css/global.css";
import router from "./router/index";
import store from "./store/index";

Vue.config.productionTip = false;
Vue.use(ElementUI);
// 全局挂载element-ui的message组件
Vue.prototype.$message = ElementUI.Message;

new Vue({
  el : "#app",
  render: h => h(App),
  created() {
    this.$store.state.user.name = "admin1";
    this.$store.state.user.schoolNumber = "203021";
    this.$store.state.user.type = "admin";
  },
  router, store
});