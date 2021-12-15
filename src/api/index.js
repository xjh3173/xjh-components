// 此文件用来对axios做基本参数设定，并封装拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import { getCookie } from '@/utils/cookie'

let isRefreshing = false // 是否在刷新token

// 刷新token后重试请求的订阅发布
const retryRequest = {
  requests: [],
  listen(response) {
    return new Promise((resolve) => {
      const config = response.config || {}
      this.requests.push((token) => {
        config.baseURL = ''
        config.headers[AUTH] = token
        resolve(instance(config))
      })
    })
  },
  trigger(token) {
    this.requests.forEach(cb => cb(token))
    this.requests = []
  }
}

const instance = axios.create({
  headers: {
    'Authorization': `Basic token`,
    'Content-Type': 'application/json'
  },
  baseURL: '/'
  // timeout: 10000
})

/* token存储字段名 */
export const ACCESS_TOKEN = 'xToken'
export const REFRESH_TOKEN = 'xRefreshToken'

/* HTTP请求头字段 */
export const AUTH = 'x-Token'

// token过期
export const CODE_TOKEN_EXPIRED = 1002
// 接口请求成功
export const CODE_SUCCESS = 0

// 请求拦截器
instance.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      let url = config.url
      config['Cache-Control'] = 'no-cache'
      if (config.params) {
        url += '?'
        const keys = Object.keys(config.params)
        for (const key of keys) {
          (config.params[key] !== undefined && config.params[key] !== null) && (url += `${key}=${encodeURIComponent(config.params[key])}&`)
        }
        url = url.substring(0, url.length - 1)
        config.params = {}
      }
      config.url = url
    }
    config.headers[AUTH] = getCookie(ACCESS_TOKEN)
    return config
  }, error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
  async response => {
    if (response.status === 200) {
      if (response.request.responseType === 'blob' && response.data.type === 'application/json') {
        await new Promise((resolve, reject) => {
          const fileReader = new FileReader()
          fileReader.onload = function() {
            try {
              const jsonData = JSON.parse(this.result)
              response.data = jsonData
              resolve(jsonData)
            } catch (err) {
              reject(err)
            }
          }
          fileReader.readAsText(response.data)
        })
      }

      if (response.data instanceof Blob && response.data.type === 'application/ms-excel') {
        return Promise.resolve(response)
      } else if (response.data.code === undefined) {
        return Promise.resolve(response.data)
      } else if (response.data.code === CODE_SUCCESS) {
        return Promise.resolve(response.data.data !== undefined ? response.data.data : response.data)
      } else if (response.data.code === CODE_TOKEN_EXPIRED) { // 登录已过期
        return require.ensure([], () => {
          const store = require('../store').default
          if (getCookie(REFRESH_TOKEN)) {
            if (!isRefreshing) {
              // 尝试刷新token
              isRefreshing = true
              store.dispatch('user/refreshToken').then(res => {
                retryRequest.trigger(res.accessToken)
              }).catch(e => {
                // 令牌已失效
                store.dispatch('user/toLogin')
              }).finally(() => {
                isRefreshing = false
              })
            }
            return retryRequest.listen(response)
          } else {
            store.dispatch('user/toLogin', response.data.message)
          }
        })
      } else {
        response.data.message && Message({
          message: response.data.message,
          type: 'error'
        })
        return Promise.reject(response)
      }
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.message.includes('timeout')) {
      Message({
        message: '数据请求超时，请稍后再试',
        type: 'error'
      })
    }
    console.log(error.response)
    console.log(error.message)
    Message({
      message: error.response.data.message,
      type: 'error'
    })
    return Promise.reject(error.message)
  }
)

export default instance
