import PaginationTable from './src'

/* istanbul ignore next */
PaginationTable.install = function(Vue) {
  Vue.component(PaginationTable.name, PaginationTable)
}

export default PaginationTable
