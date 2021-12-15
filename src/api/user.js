import request from './index'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

// 获取用户资源树
export function getResource() {
  return request({
    url: '/user/menu',
    method: 'get'
  })
}

// 刷新token
export function refreshToken() {
  return request({
    url: '/user/refreshToken',
    method: 'get'
  })
}
