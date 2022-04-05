// 配置vuex
import Vue from 'vue';
import Vuex from 'vuex';
// 获取vuex配置信息
import user from "./modules/user";
Vue.use(Vuex);

const store = new Vuex.Store({
    modules :{
        user
    }
});

export default store;