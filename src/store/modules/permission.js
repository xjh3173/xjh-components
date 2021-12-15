import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 判断是否与当前用户权限匹配
 * @param nodes
 * @param route
 */
function hasPermission(nodes, route, parentPath) {
  parentPath = parentPath || ''
  const res = nodes && nodes.some(node => {
    const code = route.meta ? route.meta.code : ''
    return code === node.code
  })
  return res
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param nodes
 */
function filterAsyncRouter(routes, nodes, parentPath) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (route.path === '*' || hasPermission(nodes, tmp, parentPath)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, nodes, tmp.path)
      }
      res.push(tmp)
    }
  })
  return res
}

const permission = {
  namespaced: true,
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    generateRoutes({ commit }) {
      return new Promise(resolve => {
        const accessedRouters = filterAsyncRouter(asyncRouterMap, this.getters.rights)
        commit('SET_ROUTERS', accessedRouters)
        resolve(accessedRouters)
      })
    }
  }
}

export default permission
