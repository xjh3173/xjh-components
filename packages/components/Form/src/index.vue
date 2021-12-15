
<template>
  <el-form ref="form" :inline="inline" :model="data" :rules="rules" :label-width="labelWidth" :label-position="labelPosition" class="json-form">
    <div v-for="(row, key) in group" :key="key" :class="{ group: Object.keys(group).length > 1 }">
      <div v-if="key !== 'undefined'" class="group-title">
        <span>{{ key }}</span>
      </div>
      <div class="group-form">
        <el-form-item
          v-for="item in group[key]"
          v-show="!item.hide"
          :key="item.key instanceof Array ? item.key[0] : (item.label + item.key)"
          :label="item.label"
          :prop="item.key instanceof Array ? item.key[0] : item.key"
          :class="[`json-form-${item.type}`, `json-form-${item.key}`, item.inline ? 'form-item-inline' : '', labelPosition === 'top' ? 'topLable' : '']"
          :style="{width: item.width || 'auto'}"
        >
          <slot v-if="item.type === 'slot'" :name="item.key" :value="data[item.key]" :data="item" />
          <component
            :is="component(item)"
            v-else
            :ref="item.key"
            v-model="data[item.key]"
            :data="item"
            @remote-method="remoteMethod($event, item.key)"
            @uploadCallback="uploadCallback"
            @stake-change="stakeChange"
          />
        </el-form-item>
        <slot />
      </div>
    </div>
  </el-form>
</template>

<script>
import jsonText from './components/text'
import jsonInput from './components/input'
import jsonInputNumber from './components/InputNumber'
import jsonSelect from './components/select'
import jsonSelectRemote from './components/selectRemote'
import jsonDatePicker from './components/datePicker'
import jsonTimePicker from './components/timePicker'
import jsonCascader from './components/cascader'
import jsonTable from './components/table'
import jsonImage from './components/image'
import jsonStake from './components/stake'
import jsonColorPicker from './components/colorPicker'
import jsonSwitch from './components/switch'
import jsonCheckbox from './components/checkbox'
import jsonRadio from './components/radio'
import jsonSlider from './components/slider'
import jsonButton from './components/button'

export default {
  name: 'JsonForm',
  components: {
    jsonText,
    jsonInput,
    jsonInputNumber,
    jsonSelect,
    jsonSelectRemote,
    jsonDatePicker,
    jsonTimePicker,
    jsonCascader,
    jsonTable,
    jsonImage,
    jsonStake,
    jsonColorPicker,
    jsonSwitch,
    jsonCheckbox,
    jsonRadio,
    jsonSlider,
    jsonButton
  },
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: 'auto'
    },
    json: {
      type: Array,
      default: () => {
        return []
      }
    },
    model: {
      type: Object,
      default: () => {
        return {}
      }
    },
    labelPosition: {
      type: String,
      default: 'right'
    }
  },
  data() {
    return {
      data: this.model,
      components: ['text', 'input', 'inputNumber', 'select', 'selectRemote', 'datePicker', 'timePicker', 'cascader', 'table', 'image', 'stake', 'colorPicker', 'switch', 'checkbox', 'radio', 'slider', 'button']
    }
  },
  computed: {
    rules() {
      const result = {}
      this.json.forEach(item => {
        if (item.validate) {
          if (item.key instanceof Array) {
            item.key.forEach(i => {
              result[i] = item.validate
            })
          } else {
            result[item.key] = item.validate
          }
        }
      })
      return result
    },
    group() {
      const result = {}
      this.json.forEach(item => {
        if (!result[item.group]) {
          result[item.group] = []
        }
        result[item.group].push(item)
      })
      return result
    }
  },
  watch: {
    data() {
      this.$emit('input', this.data)
    },
    model() {
      this.data = this.model
    }
  },
  methods: {
    stakeChange(data, key) {
      key.forEach((item, i) => {
        this.$set(this.data, item, data[i])
      })
    },
    component(item) {
      return this.components.includes(item.type) ? `json-${item.type}` : 'json-input'
    },
    remoteMethod(e, key) {
      this.$emit('remote-method', e, key)
    },
    uploadCallback(e) {
      this.$emit('uploadCallback', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  .group-title {
    margin-bottom: 16px;
    font-size: 15px;
    font-weight: bold;

    &::before {
      content: '';
      display: inline-block;
      width: 5px;
      height: 14px;
      margin-right: 8px;
      background: #6579CD;
    }
  }

  .group-form {
    margin-bottom: 20px;
    padding-top: 20px;
    background: #F4F4F4;
  }

  &:nth-last-child(2) .group-form {
    margin-bottom: 0;
  }
}

.form-item-inline {
  &.el-form-item,
  .el-form-item__content {
    display: inline-block;
    vertical-align: top
  }

  .el-form-item__label {
    float: none;
    display: inline-block
  }
}
.el-form--inline.limit-width {
  .el-date-editor.el-input {
    width: 100%;
  }

  /deep/ .el-input__inner {
    width: 185px;
  }
}
/deep/.topLable{
  margin-right: 0;
  margin-top: -10px;
  /deep/.el-form-item__label{
    width: 100%;
    font-weight: normal!important;
    line-height: 42px;
  }
  /deep/textarea{
    width: 340px;
    height: 120px!important;
    max-height: 120px!important;
    border-radius: 2px;
  }
  /deep/input,.el-form-item__content{
    border-radius: 2px;
  }
}
/deep/ .topLable+.json-form-control{
  margin-bottom: 0rem!important;
  margin-top: 24px;
  display: block;
  padding-top: 18px;
  border-top: 1px solid #D9E3EC;
  margin-left: -24px;
  margin-right: -24px;
  box-sizing: border-box;
  padding-right: 24px;
  display: flex;
  flex-direction: row-reverse;
}
</style>
