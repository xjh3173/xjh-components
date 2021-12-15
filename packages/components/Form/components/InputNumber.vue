<template>
  <el-input-number
    v-model="model"
    :precision="data.precision"
    :step="data.step"
    :min="data.min"
    :max="data.max"
    :disabled="data.disabled"
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
