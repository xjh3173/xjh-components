<template>
  <div :class="['pagination-table', paginationCenter ? 'pagination-center' : '']">
    <json-table
      ref="table"
      :json="table"
      :loading="listLoading"
      :height="tableHeight"
      :highlight="highlight"
      :row-key="rowKey"
      :check-on-click="checkOnClick"
      class="table"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <template v-for="item in table.thead" :slot="item.column" slot-scope="{row, index}">
        <slot :name="item.column" :row="row" :index="index" />
      </template>
      <template slot="details" slot-scope="scope">
        <slot name="detail" :row="scope" />
      </template>
    </json-table>
    <el-pagination
      v-if="showPage"
      class="pagination clearfix"
      :pager-count="5"
      background
      :layout="pageLayout"
      :current-page="page"
      :page-size="pageSize"
      :total="totalNum"
      @current-change="pageChange"
    >
      <span class="total">
        总共 <span class="total-num">{{ totalNum }}</span> 条记录
      </span>
    </el-pagination>
  </div>
</template>

<script>
import JsonTable from '../../Table'
import pagination from './pagination'

export default {
  name: 'PaginationTable',
  components: { JsonTable },
  mixins: [pagination],
  props: {
    paginationCenter: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    loadCreated: {
      type: Boolean,
      default: true
    },
    checkOnClick: {
      type: Boolean,
      default: true
    },
    showPage: {
      type: Boolean,
      default: true
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    table: {
      type: Object,
      default: () => {
        return {}
      }
    },
    highlight: {
      type: Boolean,
      default: false
    },
    tableHeight: {
      type: [String, Number],
      default: 300
    },
    fetchData: {
      type: Function,
      default: () => {
        return new Promise((resolve, reject) => { resolve({}) })
      }
    },
    options: {
      type: Object,
      default: () => {
        return {
          records: 'records',
          pages: 'pages',
          total: 'total'
        }
      }
    }
  },
  data() {
    return {
      multipleSelection: [],
      isConcat: false
    }
  },
  computed: {
    pageLayout() {
      return this.paginationCenter ? 'slot, prev, pager, next, jumper' : 'total, jumper, ->, prev, pager, next'
    }
  },
  watch: {
    list() {
      if (this.list instanceof Array) {
        this.table.tbody = this.list
        this.$refs.table.$refs.table.doLayout()
      }
    }
  },
  methods: {
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
    pageChange(e) {
      this.loadPage(e)
    },
    handleRowClick(row, column, event) {
      this.$emit('row-click', row, column, event)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.pagination-table {
  .table {
    border-radius: 0 0 2px 2px;

    /deep/.el-table__body-wrapper {
      height: calc(100% - 57px) !important;
    }

    /deep/ .el-button {
      width: 26px;
      height: 26px;
      padding: 0;
      background: #ECF2FF;
      color: #3C5698;
      border-radius: 6px;
      border-color: transparent;
    }

    /deep/ {
      .iconfont {
        display: inline-block;
        height: 100%;
        cursor: pointer;
        font-size: 14px;
        color: #1849FF;

        & + .iconfont {
          margin-left: 14px;
        }

        &.disable {
          color: #B3C6DD;
          cursor: not-allowed;
        }
      }
    }
  }

  .pagination {
    font-size: 14px;
    padding: 10px 30px 20px;
    text-align: left;
    background: #fff;

    .total {
      margin-right: 40px;
      font-weight: 400;

      .total-num {
        min-width: auto;
        color: $themeColor;
      }
    }

    /deep/  {
      .el-pagination__total,
      .el-pagination__jump {
        margin-top: 4px;
        margin-bottom: 4px;
      }

      .el-pagination__jump {
        margin-left: 10px;
      }
    }
  }

  &.pagination-center {
    .table {
      border-radius: 0;
      box-shadow: none;
    }

    .pagination {
      padding: 30px 30px 30px 30px;
      text-align: center;
    }

    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .el-pager li {
      margin: 4px;
    }
  }
}
</style>
