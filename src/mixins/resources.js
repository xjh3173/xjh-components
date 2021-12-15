// 资源管理mixin
export default {
  data() {
    return {
      formData: {}, // 查询条件
      tableHeight: 500, // 表格高度
      activeTab: '0', // 当前tab
      showDialog: false, // 显示弹出框
      dialogLoading: false, // 弹出框加载中
      dialogType: 1, // 当前弹出框类型
      dialogTypeMap: { // 弹出框类型
        0: {
          title: '设置',
          width: '700px',
          footer: {
            confirmText: '提交',
            confirm: 'confirmSetting'
          }
        },
        1: {
          title: '新建',
          width: '700px',
          footer: {
            confirmText: '提交',
            confirm: 'confirmNew'
          }
        },
        2: {
          title: '详情',
          width: '400px'
        },
        3: {
          title: '编辑',
          width: '700px',
          footer: {
            confirmText: '提交',
            confirm: 'confirmEdit'
          }
        }
      },
      confirmLoading: false, // 弹窗提交loading
      detailData: {}, // 列表详情数据
      editFormData: {}, // 编辑表单数据
      reviewFormData: {} // 审核表单数据
    }
  },
  computed: {
    $table() {
      return this.$refs.paginationTable
    }
  },
  mounted() {
    this.$nextTick(() => {
      const formHeight = this.$refs.form ? this.$refs.form.$el.offsetHeight : 0
      this.tableHeight = window.innerHeight - formHeight - 64 - 98 + 'px'
    })
  },
  methods: {
    // 获取表格数据
    fetchData(currentPage, pageSize) {
      return new Promise((resolve, reject) => {
        this.getApiData(currentPage, pageSize).then(data => {
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询
    doSearch() {
      this.$table.refreshData()
    },
    // 新建
    handleNew() {
      this.editFormData = {}
      this.dialogType = 1
      this.showDialog = true
    },
    // 删除
    handleDelete(e) {
      this.$confirm('是否删除选中项目？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteApiData(e.row[this.rowKey || 'id']).then(() => {
          this.$table.refreshData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        })
      }).catch(() => {})
    },
    // 查看列表详情
    handleDetail(e) {
      this.detailData = Object.assign({}, e.row)
      this.dialogType = 2
      this.showDialog = true
    },
    // 编辑列表
    handleEdit(e) {
      this.editFormData = Object.assign({}, e.row)
      this.dialogType = 3
      this.showDialog = true
    },
    // 弹出框确定点击
    confirm() {
      const confirm = this.dialogTypeMap[this.dialogType].footer.confirm
      confirm ? this[confirm]() : this.showDialog = false
    },
    // 确认新建
    confirmNew() {
      this.$refs.eidtForm.$refs.form.validate((valid) => {
        if (valid) {
          this.confirmLoading = true
          this.saveApiData().then(res => {
            this.$table.loadPage(this.$table.page)
            this.confirmLoading = false
            this.showDialog = false
            this.$message({
              type: 'success',
              message: '新增成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '新增失败!'
            })
          })
        }
      })
    },
    // 确认编辑
    confirmEdit() {
      this.$refs.eidtForm.$refs.form.validate((valid) => {
        if (valid) {
          this.confirmLoading = true
          this.updateApiData().then(res => {
            this.$table.loadPage(this.$table.page)
            this.confirmLoading = false
            this.showDialog = false
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '修改失败!'
            })
          })
        }
      })
    },
    // 返回函数promise对象
    _promise(fn, ...parmas) {
      return new Promise((resolve, reject) => {
        fn(...parmas).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
