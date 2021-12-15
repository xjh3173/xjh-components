<template>
  <div class="json-stake">
    <el-input v-model="model[0]">
      <template slot="prepend">K</template>
    </el-input>
    +
    <el-input v-model="model[1]" />
  </div>
</template>

<script>
export default {
  name: 'Stake',
  props: {
    value: {
      type: Array,
      default: () => {
        return ['', '']
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
      this.$emit('stake-change', this.model, this.data.key)
    },
    value() {
      this.model = this.value
    }
  }
}
</script>

<style lang="scss">
.json-stake {
  .el-input {
    width: 98px!important;
  }

  .el-input:last-child {
    width: 71px!important;
  }

  .el-input-group__prepend {
    padding: 0 8px;
  }
}
</style>
