// 配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入路由组件
import Home from "../view/Home";
import Login from "../view/Login";

Vue.use(VueRouter);


const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                auth: true,
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                auth: false,
            }
        }
    ]
});

// 设置全局路由守卫
router.beforeEach((to, from, next) => {
    // 路由鉴权
    if (to.meta.auth) {
        // 判断vuex中的用户信息
        if (to.params.schoolNumber === "") {
            // 重定向去到登录页面
            next({ path: '/login' });
        }
    }
    // 给页面放行
    next();
})

export default router;