import JsonTable from './src'

/* istanbul ignore next */
JsonTable.install = function(Vue) {
  Vue.component(JsonTable.name, JsonTable)
}

export default JsonTable
