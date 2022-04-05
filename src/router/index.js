// 配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入路由组件
import Home from "../components/Home";
import Login from "../components/Login";
import Password from "../components/Password";
import Profile from "../components/Profile";
import Rgister from "../components/Register";
import Welcome from "../components/Welcome";


Vue.use(VueRouter);


const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login,
            meta: {
                auth: false,
            }
        },
        {
            path: '/home',
            component: Home,
            meta: {
                auth: true,
            }, 
            redirect: '/welcome',
            children : [
                {
                    path : '/welcome',
                    component : Welcome
                },
                {
                    path : '/profile',
                    component : Profile
                },
                {
                    path : '/password',
                    component : Password
                },
                {
                    path : '/register',
                    component : Rgister
                }
            ]
        }
    ]
});

// 设置全局路由守卫
// router.beforeEach((to, from, next) => {
//     // 路由鉴权
//     if (to.meta.auth) {
//         // 判断vuex中的用户信息
//         if (store.state.user.login == false) {
//             // 重定向去到登录页面
//             next({ path: '/login' });
//         }
//     }
//     // 给页面放行
//     next();
// })

export default router;