<template>
  <el-table
    ref="table"
    v-loading="loading"
    :height="height"
    :data="json.tbody"
    :span-method="json.spanMethod"
    element-loading-text="正在加载中..."
    border
    fit
    :stripe="stripe"
    :highlight-current-row="highlight"
    :row-key="rowKey"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    :header-cell-class-name="headerCellClassName"
    class="json-table"
    @current-change="handleCurrentChange"
    @select="handleSelect"
    @select-all="handleSelectAll"
    @selection-change="handleSelectionChange"
    @row-click="handleRowClick"
    @cell-click="handleCellClick"
  >
    <el-table-column
      v-if="json.details && json.details.enable"
      type="expand"
    >
      <template slot-scope="props">
        <slot name="details" :row="props.row" />
      </template>
    </el-table-column>
    <el-table-column
      v-if="json.selection && json.selection.enable"
      :width="json.selection && json.selection.width"
      :reserve-selection="json.selection && json.selection.reserveSelection"
      type="selection"
    />
    <el-table-column
      v-if="json.index && json.index.enable"
      :label="json.index && json.index.label"
      :width="json.index && json.index.width"
      :index="json.index && json.index.formatter"
      type="index"
    />
    <Column
      v-for="(item) in json.thead"
      :key="item.column"
      :data="item"
      :clickable="json.clickable"
    >
      <template :slot="item.column" slot-scope="{row, index}">
        <slot :name="item.column" :row="row" :index="index" />
      </template>
    </Column>
  </el-table>
</template>

<script>
import Column from './Column'

export default {
  name: 'JsonTable',
  components: { Column },
  props: {
    height: {
      type: [String, Number],
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: true
    },
    json: {
      type: Object,
      default: () => {
        return {
          tbody: [],
          thead: []
        }
      }
    },
    highlight: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: ''
    },
    checkOnClick: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      handleItemClick: this.handleItemClick
    }
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  methods: {
    headerCellClassName(e) {
      const index = []
      function loop(arr) {
        for (let i = 0; i < arr.length; i++) {
          if (e.column.property === arr[i].column && e.column.label === arr[i].label) {
            index.push(i)
            break
          } else if (arr[i].children) {
            index.push(i)
            loop(arr[i].children)
          } else if (i === arr.length - 1) {
            index.pop()
          }
        }
      }
      loop(this.json.thead)
      return 'colum-level-' + (index[0] + 1)
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.$emit('current-change', currentRow, oldCurrentRow)
    },
    handleSelect(selection, row) {
      this.$emit('select', selection, row)
    },
    handleSelectAll(selection) {
      this.$emit('select-all', selection)
    },
    handleSelectionChange(val) {
      this.$emit('selection-change', val)
      this.multipleSelection = val
    },
    handleItemClick(row) {
      this.$emit('item-click', row)
    },
    handleRowClick(row, column, event) {
      this.checkOnClick && this.$refs.table.toggleRowSelection(row)
      this.$emit('row-click', row, column, event)
    },
    handleCellClick(row, column, cell, e) {
      const $column = cell.querySelector('.column')
      if ($column && $column.getAttribute('editable')) {
        const attr = $column.getAttribute('column')
        this.$set(row, 'source_' + attr, row[attr])
        this.$set(row, 'edit', true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ {
  .el-table__body-wrapper {
    &::-webkit-scrollbar{
      width: 6px;
      height: 6px;
      padding-top: 10px;
    }

    &::-webkit-scrollbar-thumb{
      height: 12px;
      border-radius: 20px;
      background-color: #B3C6DD;
    }

    &::-webkit-scrollbar-track{
      height: 12px;
      border-radius: 10px;
      background-color:#edf0f4;
    }
  }
}
</style>
