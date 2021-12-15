import JsonForm from './src'

/* istanbul ignore next */
JsonForm.install = function(Vue) {
  Vue.component(JsonForm.name, JsonForm)
}

export default JsonForm
