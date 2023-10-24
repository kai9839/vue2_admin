import axios, { Axios } from 'axios'

const httpRequest = axios.create({
    // baseURL: 'http://ttapi.research.itcast.cn/'
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
    timeout: 5000
})

// 请求拦截器
httpRequest.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err)
    }
)
// 响应拦截器
httpRequest.interceptors.response.use(
    res => {
        // 对响应数据做一些处理
        return res.data;
    },
    err => {
        // 对响应错误做一些处理
        return Promise.reject(err);
    }
);

function request(config){
    return httpRequest(config);
}

// 导出请求方法
export default request;