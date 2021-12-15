<template>
  <div class="app-container">
    <json-form ref="form" class="form contain-top" :model="formData" :json="formJson" label-width="80px" inline>
      <el-button @click="doSearch">查询</el-button>
      <el-button type="primary" @click="handleNew">新增</el-button>
    </json-form>

    <paginationTable ref="paginationTable" :table="tableJson" :fetch-data="fetchData">
      <template slot="control" slot-scope="scope">
        <span class="control-button" @click="handleEdit(scope)">修改</span>
        <span class="control-button" @click="handleDelete(scope)">删除</span>
      </template>
    </paginationTable>

    <el-dialog
      :title="dialogTypeMap[dialogType].title"
      :visible.sync="showDialog"
      :width="dialogTypeMap[dialogType].width"
      class="dialog"
    >
      <div v-if="dialogType === 1 || dialogType === 3">
        <json-form ref="eidtForm" class="form contain-top" :model="editFormData" :json="editForm" label-width="100px" inline />
      </div>

      <span v-show="dialogTypeMap[dialogType].footer" slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" :loading="confirmLoading" @click="confirm">{{ dialogTypeMap[dialogType].footer.confirmText || '确定' }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PaginationTable from 'packages/components/PaginationTable/src'
import JsonForm from 'packages/components/Form/src'
import resourcesMixin from '@/mixins/resources'
import { formJson, tableJson, editForm } from './config'
import { fetchList, addObj, getObj, delObj, putObj } from '@/api/tenant'

export default {
  components: { PaginationTable, JsonForm },
  mixins: [resourcesMixin],
  data() {
    return {
      rowKey: 'customerId',
      formJson,
      tableJson,
      editForm
    }
  },
  computed: {

  },
  mounted() {
    this.tableJson.tbody = [{ customerName: 'admin' }]
  },
  methods: {
    // 获取列表数据
    getApiData(currentPage, pageSize) {
      return this._promise(fetchList, {
        size: pageSize,
        current: currentPage,
        account: this.formData.account,
        customerName: this.formData.customerName,
        tel: this.formData.tel,
        isValid: this.formData.isValid,
        reportTypeCode: this.formData.reportTypeCode
      })
    },
    // 新建
    saveApiData() {
      this.$store.commit('globle/setAccountSelect', [])
      return this._promise(addObj, this.getParams())
    },
    // 修改
    updateApiData(params) {
      this.$store.commit('globle/setAccountSelect', [])
      return this._promise(putObj, {
        customerId: this.editFormData.customerId,
        ...this.getParams()
      })
    },
    // 删除
    deleteApiData(id) {
      this.$store.commit('globle/setAccountSelect', [])
      return this._promise(delObj, id)
    },
    // 根据id获取详情
    getApiDataById(id) {
      return this._promise(getObj, id)
    },
    // 编辑列表
    handleEdit(e) {
      this.editFormData = Object.assign({}, e.row, { date: [e.row.validTime, e.row.failureTime] })
      this.dialogType = 3
      this.showDialog = true
    },
    getParams() {
      return {
        account: this.editFormData.account,
        customerName: this.editFormData.customerName,
        tel: this.editFormData.tel,
        email: this.editFormData.email,
        validTime: this.editFormData.date[0],
        failureTime: this.editFormData.date[1],
        isValid: this.editFormData.isValid
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/paginationTable.scss";
</style>
