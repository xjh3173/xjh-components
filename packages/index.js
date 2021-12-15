/*
 * @Author: xjh
 * @Date: 2021-12-02 15:02:18
 * @LastEditors: xjh
 * @LastEditTime: 2021-12-13 13:50:26
 * @Description:
 */
import JsonForm from './components/Form'
import JsonTable from './components/Table'
import PaginationTable from './components/PaginationTable'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

const components = [
  JsonForm,
  JsonTable,
  PaginationTable
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '1.0.0',
  install,
  JsonForm,
  JsonTable,
  PaginationTable
}
