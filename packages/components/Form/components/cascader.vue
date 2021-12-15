<template>
  <el-cascader
    v-model="model"
    :options="data.option"
    :props="data.props"
    :show-all-levels="false"
    :collapse-tags="data.collapseTags"
    clearable
  />
</template>

<script>
export default {
  name: 'Cascader',
  props: {
    value: {
      type: [Array, String],
      default: () => {
        return []
      }
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
