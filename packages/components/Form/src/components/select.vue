<!--
 * @Author: xjh
 * @Date: 2020-09-27 19:40:07
 * @LastEditTime: 2021-12-13 17:10:07
 * @LastEditors: xjh
 * @Description:
 * @FilePath: /PIDS_WEB/src/components/Form/components/select.vue
-->
<template>
  <el-select
    v-model="model"
    :clearable="data.hideClear ? false : true"
    :disabled="data.disabled"
    :placeholder="data.placeholder"
    :multiple="data.multiple"
    :collapse-tags="data.collapseTags"
    :filterable="data.filterable"
    :value-key="data.valueKey || 'value'"
  >
    <template v-if="data.componentType === 'group'">
      <el-option-group
        v-for="group in data.option"
        :key="group.label"
        :label="group.label"
      >
        <el-option
          v-for="item in group.option"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :title="item.label"
          :disabled="item.disabled"
        />
      </el-option-group>
    </template>
    <template v-else>
      <el-option v-for="option in data.option" :key="option.value" :label="option.label" :value="option.value" :title="option.label" :disabled="option.disabled" />
    </template>
  </el-select>
</template>

<script>
export default {
  name: 'Select',
  props: {
    value: {
      type: [String, Number, Array],
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
