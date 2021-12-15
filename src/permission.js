/*
 * @Author: xjh
 * @Date: 2021-12-03 14:28:54
 * @LastEditors: xjh
 * @LastEditTime: 2021-12-03 15:29:02
 * @Description:
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getCookie, removeCookie } from '@/utils/cookie'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const token = getCookie('xToken')

  if (token) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const rights = store.getters.rights
      if (rights) {
        next()
      } else {
        const power = await store.dispatch('user/getResource').catch(e => {
          store.commit('user/SET_POWER', null)
        })
        const accessedRouters = await store.dispatch('permission/generateRoutes')
        router.addRoutes(accessedRouters)
        if (power === undefined) {
          removeCookie('xToken')
          next({ path: '/login' })
          NProgress.done()
        } else {
          next({ ...to, replace: true })
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next({ path: '/login' })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
