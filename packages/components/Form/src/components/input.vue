<template>
  <div>
    <span v-if="inputType === 'textarea' && data.readonly" class="readonly readonly-span" v-html="model && model.replace(/\n/g, '<br>')" />
    <el-input
      v-else
      v-model="model"
      :autosize="{ minRows: 3}"
      :type="inputType || 'text'"
      :readonly="data.readonly || inputType==='password'"
      :disabled="data.disabled"
      :placeholder="data.placeholder"
      :maxlength="data.maxlength"
      :show-word-limit="data.showWordLimit"
      :class="{ readonly: data.readonly }"
      @focus="handleFocus"
    >
      <i v-if="data.unit" slot="suffix" style="font-style:normal;margin-right: 10px;">{{ data.unit }}</i>
    </el-input>
  </div>
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
      inputType: this.data.type,
      disabled: this.data.disabled,
      lazyTimeOut: null
    }
  },
  watch: {
    model() {
      const value = this.data.type === 'number' ? +this.model : this.model
      if (this.data.lazy) {
        this.lazyTimeOut && clearTimeout(this.lazyTimeOut)
        this.lazyTimeOut = setTimeout(() => {
          this.$emit('input', value)
        }, 1000)
      } else {
        this.$emit('input', value)
      }
    },
    value() {
      this.model = this.data.type === 'number' ? +this.value : this.value
    }
  },
  methods: {
    handleFocus(event) {
      if (this.inputType === 'password' && !this.data.readonly) {
        event.target.removeAttribute('readonly')
      }
    }
  }
}
</script>

<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.readonly {
  &.readonly-span {
    display: inline-block;
    width: 490px;
    padding: 4px 15px;
    line-height: 30px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #E4E7ED;
    background-color: #F5F7FA;
    color: #606266;
  }

  .el-input__inner {
    background-color: #F5F7FA;
    border-color: #E4E7ED;
  }
}
</style>
