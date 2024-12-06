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
                    path: "/child",
                    name: "child",
                    component: () => import("@/ChildComponent.vue"),
                },
                {
                    path: "/file",
                    name: "file",
                    component: () => import("@/views/file/FileList.vue"),
                },
                {
                    path: "/article",
                    name: "article",
                    component: () => import("@/views/article/ArticleList.vue"),
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
router.beforeEach((to, from, next) => {
    /**
     * to:   要到哪个路由
     * from: 当前路由
     * next: 只有执行next页面才会跳转
     */
    console.log("目标路由：", to, "当前路由：", from)

    //从localstorage中获取token
    const token = localStorage.getItem("token");

    if (!token) {
        //localstorage中不存在token
        if (to.path === "/login") {
            next();
            return;
        }
        if (to.path === "/register") {
            next();
            return;
        }
        next("/login");
    } else {
        //localstorage中存在token
        next();
    }
});
export default router;