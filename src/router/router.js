import {createRouter, createWebHashHistory} from "vue-router";
// 创建路由
const router = createRouter({
    // 路由模式
    history: createWebHashHistory(),
    // 路由表
    routes: [
        {
            path: "/",
            name: "layout",
            redirect: "/home", //路由转发
            component: () => import("@/views/layout/Layout.vue"),
            //子路由
            children: [
                {
                    path: "/home",
                    name: "home",
                    component: () => import("@/views/Home.vue"),
                },
                {
                    path: "/user",
                    name: "user",
                    component: () => import("@/views/user/UserList.vue"),
                },
                {
                    path: "/file",
                    name: "file",
                    component: () => import("@/views/file/FileList.vue"),
                },
            ],
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/Login.vue"),
            meta: {title: "登陆页面"},
        },
        {
            path: "/register",
            name: "register",
            component: () => import("@/views/Register.vue"),
            meta: {title: "注册页面"},
        },
    ],
});
export default router;