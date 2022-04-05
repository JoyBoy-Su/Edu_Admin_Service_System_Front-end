// 二次封装与用户有关的request请求
import request from "@/utils/request";

export default function login(data) {
    // 发送登录请求
    return request({
        url : "/userInfo",
        method : "post",
        data
    });
}