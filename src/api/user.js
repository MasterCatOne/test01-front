import {post,get,put,del} from '@/utils/request.js'





// 登录接口
export const getUserListApi=data=>{
    return get({
        // 请求的地址
        url:'/api/user/getList'
    })
}
// 注册接口
export const registerApi = (data) => {
    return post({
        // 请求的地址
        url: "/api/user/register",
        data,
    });
}
// 登录接口
export const loginApi=data=>{
    return post({
        // 请求的地址
        url:'/api/user/login',
        data
    })
}
// 获取用户信息
export const userPageApi = (data) => {
    return get({
        // 请求的地址
        url: "/api/user/page",
        data,
    });
};
// 添加用户
export const userAddApi = (data) => {
    return post({
        // 请求的地址
        url: "/api/user/register",
        data,
    });
};
// 修改用户
export const userUpdateApi = (data) => {
    return put({
        // 请求的地址
        url: "/api/user/updateById",
        data,
    });
};
// 删除用户
export const userDelApi = (data) => {
    return del({
        // 请求的地址
        url: `/api/user/remove/${data}`,
    });
};