<template>
  <div class="user-wrap">
    <!-- 搜索框 start -->
    <el-form
      class="main-search"
      :inline="true"
      :model="keywords"
      ref="keywords"
      :rules="searchRules"
      label-position="left"
      label-width="85px"
      size="medium">
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户ID" prop="id">
            <el-input type="number" v-model.number="keywords.id" placeholder="请输入用户ID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户名称" prop="name">
            <el-input type="text" v-model="keywords.name" placeholder="请输入用户名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户邮箱" prop="email">
            <el-input type="text" v-model="keywords.email" placeholder="请输入用户邮箱"></el-input>
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
        <el-button type="primary" size="medium" @click="handleAdd">新增管理员</el-button>
      </div>
      <el-table v-loading="!this.reqFlag.search" :data="tableData" header-row-class-name="table-header" border>
        <el-table-column prop="id" label="ID" align="center" width="120"></el-table-column>
        <el-table-column prop="name" label="账号" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="type" label="身份" align="center"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="update_time" label="更新时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button  size="mini" :disabled="scope.row.type==='管理员'" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button  size="mini" :disabled="scope.row.type==='管理员'" type="danger" plain @click="handleDelete(scope.row.id)">删除</el-button>
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
<!--新增管理员弹窗-->
    <el-dialog title="新增管理员" :visible.sync="dialogFormVisible" @close="closeDialog">
      <el-form ref="formData" :model="formData" :rules="formRules" label-width="80px">
        <el-form-item label="账号" prop="name">
          <el-input v-model="formData.name" placeholder="请输入管理员账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入管理员邮箱"></el-input>
        </el-form-item>
        <el-form-item class="dialog-footer" align="center">
          <el-button type="primary" @click="onSave('formData')">保 存</el-button>
          <el-button @click="onCancel('formData')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--分配角色弹窗-->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisible2">
      <el-form ref="formData2" :model="formData2" label-width="80px">
        <el-form-item label="账号" prop="name">
          <el-input v-model="formData2.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData2.email"></el-input>
        </el-form-item>
        <el-form-item class="dialog-footer" align="center">
          <el-button type="primary" @click="onSave2()">设置为管理员</el-button>
          <el-button @click="onCancel2()">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
  inject: ['reload'],
  data () {
    const validate = (rule, value, callback) => {
      const reg = /^[0-9a-zA-Z]*$/g
      if (!value) {
        callback(new Error('请输入内容'))
      } else if (value.length < 3 || value.length > 6) {
        callback(new Error('内容长度需在 3 到 6 个字符'))
      } else if (!reg.test(value)) {
        callback(new Error('内容需为字母或数字'))
      } else {
        callback()
      }
    }
    return {
      keywords: {
        id: null,
        name: null,
        email: null
      },
      searchRules: {
      },
      reqFlag: { // 防止频繁点击，造成连续多次发请求
        search: true,
        delete: true,
        edit: true
      },
      pageNum: 1, // 请求第几页
      pageSize: this.$store.state.pageSize, // 每页请求多少条
      currentPage: 1, // 初始时在第几页
      totalCount: 0, // 总共多少条数据
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      id: null,
      formRules: {
        name: [
          { validator: validate, trigger: 'blur' }
        ],
        password: [
          { validator: validate, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      },
      formData: {
        name: null,
        password: null,
        email: null
      },
      formData2: {
        name: null,
        email: null
      }
    }
  },
  created () {
    this.onSearch()
  },
  methods: {
    onSave2 () {
      const url = '/user/role'
      if (this.reqFlag.edit) {
        this.reqFlag.edit = false
        let params = {
          id: this.id,
          email: this.formData2.email
        }
        this.$axios.post(url, params).then(res => {
          if (res.status === 200) {
            this.$message.success(res.data.msg)
          } else {
            this.$message.error(res.data.msg)
          }
          this.reqFlag.edit = true
          this.reload()
        })
        this.dialogFormVisible2 = false
      }
    },
    onCancel2 () {
      this.dialogFormVisible2 = false
    },
    onCancel () {
      this.dialogFormVisible = false
      this.$refs['formData'].resetFields()
    },
    closeDialog () {
      this.$refs['formData'].resetFields()
    },
    onSave (formName) {
      let url = '/admin/new'
      let params = {
        name: this.formData.name,
        password: this.formData.password,
        email: this.formData.email
      }
      this.$axios.post(url, params).then(res => {
        if (res.status === 200) {
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
        this.dialogFormVisible = false
        this.$refs[formName].resetFields()
      })
    },
    handleAdd () {
      this.dialogFormVisible = true
    },
    handleEdit (user) {
      this.formData2 = user
      this.dialogFormVisible2 = true
      this.id = user.id
      console.log(user)
    },
    handleDelete (id) {
      const url = '/user/delete'
      this.$confirm('此操作将永久删除该用户, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let params = {
          id: id
        }
        this.$axios.post(url, params).then(res => {
          if (res.status === 200) {
            this.$message.success('删除成功')
          }
          this.reload()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    onSearch () {
      const url = '/user/list'
      if (this.reqFlag.search) {
        this.reqFlag.search = false
        let params = {
          searchId: this.keywords.id,
          searchName: this.keywords.name,
          searchEmail: this.keywords.email,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.$axios.post(url, params).then(res => {
          let resData = res.data
          if (resData.code === 200) {
            // console.log(resData.data.list)
            this.totalCount = resData.data.totalCount
            let list = resData.data.list
            list.map(row => {
              row.type = row.type === 1 ? '管理员' : '普通用户'
            })
            this.tableData = list
            this.currentPage = this.pageNum
          } else {
            this.$message.error(resData.msg)
          }
          this.reqFlag.search = true
        })
      }
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.onSearch()
    },
    onReset (formName) {
      this.$refs[formName].resetFields()
      this.pageNum = 1
      this.onSearch()
      this.currentPage = 1
    }
  }
}
</script>

<style lang="scss">
  .hr-10{
    width:100%;
    height:10px;
    background:#f5f7fa
  }
  .content-header {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
