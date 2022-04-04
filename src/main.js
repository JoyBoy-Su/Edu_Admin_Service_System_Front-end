import { Button, Form, FormItem, Input, Option, Select } from 'element-ui';
import Vue from 'vue';
import App from './App.vue';
import router from "./router/index";

Vue.config.productionTip = false;
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Button.name, Button);

new Vue({
  el : "#app",
  render: h => h(App),
  router
});