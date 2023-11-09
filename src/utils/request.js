import axios from 'axios'
import store from '@/store'
import router from '@/router'

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
        // 401 状态码，进入该函数
        if (err.response && err.response.status === 401) {
            // 1. 清空无效用户信息
            // 2. 跳转到登录页
            // 3. 跳转需要传参（当前路由地址）给登录页码
            store.commit('user/setUser', {})
            // 当前路由地址
            // 组件里头：`/user?a=10` $route.path === /user  $route.fullPath === /user?a=10
            // js模块中：router.currentRoute.value.fullPath 就是当前路由地址，router.currentRoute 是ref响应式数据
            const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
            // encodeURIComponent 转换uri编码，防止解析地址出问题
            console.log(fullPath)
            router.push('/login?redirectUrl=' + fullPath)
        }
        // 对响应错误做一些处理
        return Promise.reject(err);
    }
);

function request(config) {
    return httpRequest(config);
}

// 导出请求方法
export default request;