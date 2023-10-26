import Mock from 'mockjs'

// 定义mock请求拦截
Mock.mock('http://pcapi-xiaotuxian-front-devtest.itheima.net/member/home/getData', function () {
    // 拦截到请求后的处理逻辑
    console.log('拦截到了')
})