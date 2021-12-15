<template>
  <json-table :json="data.value" :stripe="false" />
</template>

<script>
import jsonTable from '@/components/Table'

export default {
  name: 'Table',
  components: { jsonTable },
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
      inputType: this.data.type
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
