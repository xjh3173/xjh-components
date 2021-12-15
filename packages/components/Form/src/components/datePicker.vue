<template>
  <el-date-picker
    v-model="model"
    :type="data.componentType || 'date'"
    :value-format="data.format || 'yyyy-MM-dd'"
    :default-time="data.componentType === 'daterange' ? ['00:00:00', '23:59:59'] : null"
    range-separator="-"
    :disabled="data.disabled"
    :placeholder="data.placeholder || '选择日期'"
    :start-placeholder="data.startPlaceholder || '开始日期'"
    :end-placeholder="data.endPlaceholder || '结束日期'"
    :picker-options="data.pickerOptions === -1 ? pickerOptionsBefore : (data.pickerOptions === 1 ? pickerOptionsAfter : '')"
  />
</template>

<script>
export default {
  name: 'DatePicker',
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
      model: this.value,
      pickerOptionsAfter: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7 // 可选择今天以及今天之后,如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      pickerOptionsBefore: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6 // 可选择今天以及今天之前,如果没有后面的-8.64e7就是不可以选择今天的
        }
      }
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
