import {get,put} from "@/utils/request.js";

// 获取文章信息
export const articleListApi = (data) => {
    return get({
        // 请求的地址
        url: "/api/article/getArticleList",
        data,
    });
};
// 修改文章
export const userUpdateApi = (data) => {
    return put({
        // 请求的地址
        url: "/api/article/updateArticle",
        data,
    });
};