<template>
  <el-checkbox-group v-model="model">
    <el-checkbox v-for="option in data.option" :key="option.value" :label="option.label" />
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'Checkbox',
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
