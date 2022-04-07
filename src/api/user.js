// 二次封装与用户有关的request请求
import request from "@/utils/request";

export function login(data) {
    // 发送登录请求
    data = JSON.stringify(data);
    return request({
        url : "/login",
        method : "post",
        data
    });
}

export function changePassword(data) {
    data = JSON.stringify(data);
    return request({
        url : "/homepage/modifyPassword",
        methon : "post",
        data
    });
}

export function register(data) {
    data = JSON.stringify(data);
    return request({
        url : "/homepage/addMember",
        method : "post",
        data
    });
}