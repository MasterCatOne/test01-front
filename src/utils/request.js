import axios from "axios";
import {ElLoading, ElMessage} from "element-plus";

let loadingObject = null;//创建一个loding 这里不能用const来定义，因为需要修改loadingObject的值

// 创建axios实例
const instance = axios.create({
    baseURL: "http://localhost:8099", // 替换为你的 IP 和端口
    timeout: 8000, // 请求超时时间
    headers: {
        "Content-Type": "application/json; charset=utf-8",// 设置请求头的 Content-Type 为 application/json
       "token": localStorage.getItem("token"), // 如果需要的话可以添加认证信息
       //  "token":"noveleyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZW1vIiwiaWQiOiIyNyIsIm5hbWUiOiLmooXlm73pppkiLCJlbWFpbCI6IjEyM0BxcS5jb20iLCJpYXQiOjE3MzMyOTg4NjMsImV4cCI6MTczNTA1MTg5Nn0.iyraeLpFN_clrSW2kYjhd6PxPqR_3Ubq-2MURAwOZRI"
    },
});

// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {// 请求发送前执行的操作
        //添加请求动画动画
        loadingObject = ElLoading.service({
            lock: true, // 锁住
            text: "Loading",// 加载文案
            background: "rgba(0, 0, 0, 0.7)",// 背景色
        });
        // 动态设置 token
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["token"] = token;
        }
        return config;
    },
    function (error) {// 请求失败后执行的操作
        loadingObject.close();// 关闭动画
        return error;
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {// 响应成功
        loadingObject.close();     // 关闭动画
        const data = response.data;//获取响应数据
        if (data.code !== 0) {     //响应码不为0，显示错误消息
            ElMessage({
                message: data.message || '网络出错',  //提示错误消息
                type: 'error',                      //消息类型
                duration: 5 * 1000,                 //持续5秒
            })
            return data
        } else {
            // 请求成功
            return data;
        }
    },
    function (error) {    // 响应失败
        loadingObject.close();      // 关闭动画
        console.log('err' + error)  // 打印错误信息
        ElMessage({
            message: error.message, //提示错误消息
            type: "error",
            duration: 5 * 1000,     //持续5秒
        });
        return error;
    }
);

// post请求
export const post = (config) => {
    return instance({
        ...config,
        method: "post",
        data: config.data,
    });
};

// get请求
export const get = (config) => {
    return instance({
        ...config,
        method: "get",
        params: config.data
    });
};

// put请求
export const put = (config) => {
    return instance({
        ...config,
        method: "put",
        data: config.data,
    });
}

// delete请求
export const del = (config) => {
    return instance({
        ...config,
        method: "delete"
    });
}
export default instance;