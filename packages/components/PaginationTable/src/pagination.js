// 分页数据加载mixin
export default {
  data() {
    return {
      listLoading: false,
      list: [],
      page: 1,
      pageCount: 10,
      totalPage: 0,
      totalNum: 0,
      noData: false
    }
  },
  created() {
    this.refreshData()
  },
  methods: {
    refreshData() {
      this.listLoading = true
      this.page = 1
      this.fetchData(this.page, this.pageCount).then(data => {
        this.list = data
        // this.list = data.records || []
        // this.totalPage = data.pages
        // this.totalNum = data.total
        this.noData = this.list.length === 0
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
        this.$message('获取数据失败，请稍后重试')
      })
    },
    loadPage(page) {
      this.listLoading = true
      if (typeof page === 'number') {
        this.page = page
      } else {
        this.page++
      }
      this.fetchData(this.page, this.pageCount).then(data => {
        this.list = data
        // this.list = data.records || []
        // this.totalPage = data.pages
        // this.totalNum = data.total
        this.noData = this.list.length === 0
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
        this.$message('获取数据失败，请稍后重试')
      })
    }
  }
}
