import {get} from "@/utils/request.js";
// 获取用户信息
export const articleListApi = (data) => {
    return get({
        // 请求的地址
        url: "/api/article/getArticleList",
        data,
    });
};