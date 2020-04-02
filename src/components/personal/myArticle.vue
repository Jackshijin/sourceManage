<template>
  <div class="my-article">
    <h3 class="v-line-icon">我的发表</h3>
    <el-table
      :data="tableData"
      header-row-class-name="table-header"
      v-loading="!this.reqFlag.init"
      size="small"
      border
      style="width: 100%">
      <el-table-column prop="id" label="ID" align="center" width="120">
      </el-table-column>
      <el-table-column label="文章名称" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="goArticleDetails(scope.row.id)">{{scope.row.title}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="创建者" align="center"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="update_time" label="更新时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>

export default {
  data () {
    return {
      pageNum: 1, // 请求第几页
      pageSize: this.$store.state.pageSize, // 每页请求多少条
      currentPage: 1, // 初始时在第几页
      totalCount: 0, // 总共多少条数据
      tableData: [],
      reqFlag: {
        init: true,
        delete: true
      }
    }
  },
  created () {
    this.getMyArticle()
  },
  methods: {
    // 获取个人发表的文章和公告
    getMyArticle () {
      let url = '/article/mine'
      if (this.reqFlag.init) {
        this.reqFlag.init = false
        let params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.$axios.post(url, params).then(res => {
          let resData = res.data
          if (resData.code === 200) {
            this.totalCount = resData.data.totalCount
            this.tableData = resData.data.list
            this.currentPage = this.pageNum
          }
          this.reqFlag.init = true
        })
      }
    },
    goArticleDetails (id) {
      this.$router.push({
        path: '/articleDetail',
        query: {
          id
        }
      })
    },
    handleEdit (id) {
      this.$router.push({
        path: '/articleEdit',
        query: {
          id
        }
      })
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.reqFlag.delete) {
          this.reqFlag.delete = false
          let url = '/article/delete'
          let params = {
            id: id
          }
          this.$axios.post(url, params).then(res => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getMyArticle()
            }
            this.reqFlag.delete = true
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.getMyArticle()
    }
  }
}
</script>

<style lang="scss">
  h3 {
    margin-top: 0;
  }
  .v-line-icon{
    position: relative;
    padding-left: 9px
  }
  .v-line-icon:before{
    position: absolute;
    content: "";
    width: 4px;
    height: 18px;
    left: 0;
    top: 50%;
    margin-top: -9px;
    border-radius: 2px;
    background: #ff4200
  }
</style>
