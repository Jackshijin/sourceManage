<template>
  <div class="article-wrapper">
    <!-- 搜索框 start -->
    <el-form class="main-search"
             :inline="true"
             :model="keywords"
             ref="keywords"
             label-position="left"
             label-width="85px"
             size="medium">
      <el-row>
        <el-col :span="6">
          <el-form-item label="文章ID" prop="id">
            <el-input type="number" v-model.number="keywords.id" placeholder="请输入文章/公告ID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="文章名称" prop="title">
            <el-input v-model="keywords.title" placeholder="请输入文章名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="创建者" prop="author">
            <el-input v-model="keywords.author" placeholder="请输入发布人名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button type="primary" plain @click="onSearch">搜索</el-button>
          <el-button @click="onReset('keywords')">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- 搜索框 end -->

    <!-- 分割线 start -->
    <div class="hr-10"></div>
    <!-- 分割线 end -->
    <div class="main-content">
      <div class="content-header">
        <el-button type="primary" size="medium" plain @click="handleAdd">发布文章公告</el-button>
      </div>
      <el-table
        v-loading="!this.reqFlag.search"
        :data="tableData"
        header-row-class-name="table-header"
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
        <el-table-column label="操作" align="center" width="180" v-if="judgeAdmin">
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
  </div>
</template>

<script>

export default {
  data () {
    return {
      keywords: {
        id: null,
        title: null,
        author: null
      },
      reqFlag: { // 防止频繁点击，造成连续多次发请求
        search: true,
        delete: true
      },
      pageNum: 1, // 请求第几页
      pageSize: this.$store.state.pageSize, // 每页请求多少条
      currentPage: 1, // 初始时在第几页
      totalCount: 0, // 总共多少条数据
      tableData: []
    }
  },
  methods: {
    onSearch () {
      const url = '/article/search'
      if (this.reqFlag.search) {
        this.reqFlag.search = false
        let params = {
          searchId: this.keywords.id,
          searchTitle: this.keywords.title,
          searchAuthor: this.keywords.author,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.$axios.post(url, params).then(res => {
          let resData = res.data
          if (resData.code === 200) {
            this.totalCount = resData.data.totalCount
            this.tableData = resData.data.list
            this.currentPage = this.pageNum
            // this.$message.success(resData.msg)
          } else {
            this.$message.error(resData.msg)
          }
          this.reqFlag.search = true
        })
      }
    },
    onReset (formName) {
      this.$refs[formName].resetFields()
      this.pageNum = 1
      this.onSearch()
      this.currentPage = 1
    },
    handleAdd () {
      this.$router.push({ path: '/articleAdd' })
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
              this.onSearch()
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
      this.onSearch()
    }
  },
  computed: {
    judgeAdmin () {
      return this.$store.state.userInfo['userType'] === 1
    }
  },
  created () {
    this.onSearch()
  }
}
</script>

<style lang="scss">
  .article-wrap{
    padding: 20px;
    h3{margin: 0;}
    .el-form{
      width: 80%;
      max-width: 1000px;
      min-width: 825px;
      margin: 30px auto 0;
      .quill-editor { height: auto; }
      .quill-editor .ql-container{height: 180px;}
    }
    .el-input.is-disabled .el-input__inner, .week-work-box{color: #888;}
    /* 文章详情样式 end */
  }
    .hr-10{
      width:100%;
      height:10px;
      background:#f5f7fa
    }
    .main-content {
      .content-header {
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
</style>
