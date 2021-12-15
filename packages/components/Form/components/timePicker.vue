<template>
  <el-time-picker
    v-model="model"
    :is-range="data.isRange"
    :picker-options="data.pickerOptions"
    :value-format="data.format || 'HH:mm:ss'"
    :disabled="data.disabled"
    range-separator="-"
    placeholder="选择时间"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    :arrow-control="data.arrowControl"
  />
</template>

<script>
export default {
  name: 'TimePicker',
  props: {
    value: {
      type: [String, Array],
      default: null
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      model: this.value
    }
  },
  watch: {
    model(val) {
      this.$emit('input', this.model)
    },
    value(val) {
      this.model = this.value
    }
  }
}
</script>
