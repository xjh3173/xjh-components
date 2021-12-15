<!--
 * @Author: xjh
 * @Date: 2020-09-27 19:40:07
 * @LastEditTime: 2021-05-17 18:06:10
 * @LastEditors: xjh
 * @Description:
 * @FilePath: /PIDS_WEB/src/components/Form/components/InputNumber.vue
-->
<template>
  <el-input-number
    v-model="model"
    :precision="data.precision"
    :step="data.step"
    :min="data.min"
    :max="data.max"
  />
</template>

<script>
export default {
  name: 'Select',
  props: {
    value: {
      type: Number,
      default: null
    },
    data: {
      type: Object,
      default: () => {
        return {
          precision: 1,
          step: 1
        }
      }
    }
  },
  data() {
    return {
      model: this.value
    }
  },
  watch: {
    model() {
      this.$emit('input', this.model)
    },
    value() {
      this.model = this.value
    }
  },
  methods: {}
}
</script>
