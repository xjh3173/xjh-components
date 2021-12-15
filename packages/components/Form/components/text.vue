<template>
  <span class="json-text" v-html="model" />
</template>

<script>
export default {
  name: 'Text',
  props: {
    value: {
      type: [String, Number],
      default: null
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
  }
}
</script>

<style>
.json-text {
  position: relative;
  display: inline-block;
  font-size: 14px;
}
</style>
