import {post,get} from '@/utils/request.js'

// 登录接口
export const loginApi=data=>{
    return post({
        // 请求的地址
        url:'/api/user/login',
        data
    })
}


// 登录接口
export const getUserListApi=data=>{
    return get({
        // 请求的地址
        url:'/api/user/getList'
    })
}