import Mock from 'mockjs'
import homeApi from './mockServeData/home'

const baseUrl = 'http://pcapi-xiaotuxian-front-devtest.itheima.net'
// 定义mock请求拦截
// home
Mock.mock(`${baseUrl}/member/home/getData`, homeApi.getStatisticalData)