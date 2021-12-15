<template>
  <el-slider v-model="model" class="json-slider" :show-input="data.showInput" />
</template>

<script>
export default {
  name: 'Slider',
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

<style scoped>
.json-slider {
  padding: 0 12px;
}
</style>
