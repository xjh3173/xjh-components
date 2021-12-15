<template>
  <el-table-column
    :prop="data.column"
    :label="data.label"
    :width="data.width"
    show-overflow-tooltip
    :fixed="data.fixed || false"
    :align="data.align || 'center'"
  >
    <template v-if="data.children">
      <Column
        v-for="(item) in data.children"
        :key="item.column"
        :data="item"
        :clickable="clickable"
      />
    </template>

    <template v-if="!data.type" slot-scope="{row, $index}">
      <slot v-if="data.slot" :name="data.column" :row="row" :index="$index" />
      <template v-else>
        <span v-if="data.state && row[data.column]" :style="{ background: getColor(row) }" class="tableStateItem" v-html="'&nbsp;'" />
        <span
          :column="data.column"
          :editable="data.editable"
          :class="{ 'column': true, 'link-type': clickable }"
          @click="handleClick(row)"
          v-html="content(row, data)"
        />
      </template>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'Column',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    clickable: Boolean
  },
  inject: ['handleItemClick'],
  methods: {
    content(row, item) {
      let result = ''
      if (item.option) {
        result = item.option[row[item.column]]
      } else {
        if (('' + row[item.column]).indexOf('\n') >= 0) {
          result = row[item.column].replace(/\n/g, '<br>')
        } else {
          result = row[item.column]
        }
      }
      return result
    },
    handleClick(item) {
      this.handleItemClick(item)
    },
    sumitEdit(row) {
      this.$set(row, 'edit', false)
    },
    cancelEdit(row, key) {
      this.$set(row, key, row['source_' + key])
      this.$set(row, 'edit', false)
    },
    getColor(row) {
      const item = this.data.state ? this.data.state.find(d => d.value === row[this.data.column]) : ''
      return item !== undefined ? item.color : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-box {
  display: flex;
}

.link-type {
  color: #4E72D4;
  cursor: pointer;
}
.tableStateItem{
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  vertical-align: middle;
  margin-bottom: 1px;
  background: #3C5698;
}
/deep/ {
  .el-input {
    width: auto;
    margin-right: 10px;
  }
}
</style>
