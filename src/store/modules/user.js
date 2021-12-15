import { login, logout, getResource, refreshToken } from '@/api/user'
import { setCookie, removeCookie } from '@/utils/cookie'

const state = {
  token: '',
  userinfo: null,
  power: null
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, data) => {
    state.userinfo = data
  },
  SET_POWER: (state, data) => {
    state.power = data
  }
}

const actions = {
  // user login
  login({ commit }, loginData) {
    return new Promise((resolve, reject) => {
      login(loginData).then(res => {
        setCookie('xToken', res.accessToken)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        dispatch('toLogin')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // toLogin
  toLogin({ commit }, message) {
    require.ensure([], () => {
      const { Message } = require('element-ui')
      const routerObj = require('@/router')
      const router = routerObj.default
      message && Message({
        message: message,
        type: 'error'
      })
      removeCookie('xToken')
      commit('SET_POWER', null)
      routerObj.resetRouter()
      router.push(`/login?redirect=${router.currentRoute.fullPath}`)
    })
  },
  getResource({ commit }) {
    return new Promise((resolve, reject) => {
      getResource().then(res => {
        const power = []
        commit('SET_POWER', power)
        resolve(power)
      }).catch(e => {
        reject(e)
      })
    })
  },
  refreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      refreshToken().then(res => {
        setCookie('xToken', res.accessToken)
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

