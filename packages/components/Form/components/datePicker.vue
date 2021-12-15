<template>
  <el-date-picker
    v-model="model"
    :default-value="data.componentType === 'daterange' ? lastMonthDate() : new Date()"
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
  },
  methods: {
    lastMonthDate() {
      const Nowdate = new Date()
      let vYear = Nowdate.getFullYear()
      let vMon = Nowdate.getMonth() + 1
      let vDay = Nowdate.getDate()
      // 每个月的最后一天日期（为了使用月份便于查找，数组第一位设为0）
      const daysInMonth = new Array([0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])
      if (vMon === 1) {
        vYear = Nowdate.getFullYear() - 1
        vMon = 12
      } else {
        vMon = vMon - 1
      }
      // 若是闰年，二月最后一天是29号
      if (vYear % 4 === 0 && vYear % 100 !== 0 || vYear % 400 === 0) {
        daysInMonth[2] = 29
      }
      if (daysInMonth[vMon] < vDay) {
        vDay = daysInMonth[vMon]
      }
      if (vDay < 10) {
        vDay = '0' + vDay
      }
      if (vMon < 10) {
        vMon = '0' + vMon
      }
      const date = new Date(vYear + '-' + vMon + '-' + vDay)
      return date
    }
  }
}
</script>
