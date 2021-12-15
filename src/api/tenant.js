import request from '@/api'

export function fetchList(query) {
  return request({
    url: '/customer/customer/list/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/customer/customer/save',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/customer/customer/get/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/customer/customer/removeById/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/customer/customer/update',
    method: 'put',
    data: obj
  })
}

export function checkObj(obj) {
  return request({
    url: '/customer/customer/check',
    method: 'post',
    data: obj
  })
}

export function prepaidObj(obj) {
  return request({
    url: '/customer/customer/prepaid',
    method: 'post',
    data: obj
  })
}

export function drawbackObj(obj) {
  return request({
    url: '/customer/customer/drawback',
    method: 'post',
    data: obj
  })
}

export function getBalanceList(obj) {
  return request({
    url: '/customer/customer/balance/page',
    method: 'get',
    params: obj
  })
}

export function getSelect() {
  return request({
    url: '/customer/customer/select',
    method: 'get'
  })
}

export function getReportTypeList() {
  return request({
    url: '/reportType/select',
    method: 'get'
  })
}
