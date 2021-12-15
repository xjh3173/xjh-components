<template>
  <el-color-picker
    v-model="model"
    show-alpha
    :predefine="option"
    :disabled="data.disabled"
  />
</template>

<script>
export default {
  name: 'Input',
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
      model: this.value,
      option: this.data.option
    }
  },
  watch: {
    model() {
      this.$emit('input', this.model)
    },
    value() {
      this.model = this.value
    }
  }
}
</script>

<style lang="scss">

</style>
