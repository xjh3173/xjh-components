<template>
  <el-select v-model="model" filterable remote :placeholder="data.placeholder" :remote-method="remoteMethod" :loading="data.loading" loading-text="努力搜索中..." no-data-text="无匹配数据">
    <el-option v-for="option in data.option" :key="option.value" :label="option.label" :value="option.value" />
  </el-select>
</template>

<script>
export default {
  name: 'RemoteSelect',
  props: {
    value: {
      type: [String, Number],
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
    model() {
      this.$emit('input', this.model)
    },
    value() {
      this.model = this.value
    }
  },
  methods: {
    remoteMethod(str) {
      this.$emit('remote-method', str)
    }
  }
}
</script>
