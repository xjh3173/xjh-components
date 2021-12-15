<template>
  <el-radio-group v-model="model" :disabled="data.disabled">
    <el-radio v-for="option in data.option" :key="option.value" :label="option.value">{{ option.label }}</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    value: {
      type: [String, Number, Array],
      default: () => []
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
  methods: {}
}
</script>
<style lang="scss" scoped>
/deep/{
  .is-disabled{
    background:none!important;
  }
}
</style>

