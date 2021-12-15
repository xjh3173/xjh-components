import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    hidden: true
  },
  {
    path: '/index',
    component: Layout,
    meta: { title: '首页', icon: 'pids-wangluojiankongguanli' },
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('../views/index'),
        meta: { title: '首页' }
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    meta: { title: '权限测试页', icon: 'pids-wangluojiankongguanli', code: 'permission_code' },
    children: [
      {
        path: 'permission',
        name: 'permission',
        component: () => import('../views/permission'),
        meta: { title: '权限测试页', code: 'permission_code' }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
