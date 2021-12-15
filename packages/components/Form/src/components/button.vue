<template>
  <el-button @click="data.onClick">{{ data.buttonLabel }}</el-button>
</template>

<script>
export default {
  name: 'Button',
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
