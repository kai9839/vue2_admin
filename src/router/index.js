import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import NProgress from 'nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // path为空， 回作为默认子路由渲染
        name: 'home',
        component: () => import('@/views/home'),
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/article')
      },
      {
        path: '/material',
        name: 'material',
        component: () => import('@/views/material')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 开启顶部导航进度条特效
  NProgress.start()

  // 需要登录的路由：地址是以 /member 开头
  const { profile } = store.state.user
  if (!profile.token && to.path !== '/login') {
    localStorage.removeItem('article_admin_system')
    next(false);
    return next('/login');
  }
  next()
})

router.afterEach((to, from) => {
  // 结束顶部的导航进度条
  NProgress.done();
});

export default router
