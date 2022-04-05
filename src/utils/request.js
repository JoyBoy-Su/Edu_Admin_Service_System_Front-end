// 封装axios，设置axios的默认配置与拦截器
import axios from "axios";

const request = axios.create({
    baseURL : "http://localhost:8080/api",
    method : "get",
    timeout: 500
});

export default request;