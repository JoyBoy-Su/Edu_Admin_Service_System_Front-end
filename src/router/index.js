// 配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入路由组件
import Login from "../view/Login";

Vue.use(VueRouter);


const router = new VueRouter({
    routes : [
        {
            path : '/login',
            component : Login
        }
    ]
});

export default router;