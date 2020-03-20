<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSourceSearch()"
          type="primary"
          size="small">
          查询结果
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="资源编号：">
            <el-input style="width: 203px" v-model="listQuery.sourceNumber" placeholder="资源ID"></el-input>
          </el-form-item>
          <el-form-item label="资源名称：">
            <el-input style="width: 203px" v-model="listQuery.sourceName" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源分类：">
            <el-cascader
              :show-all-levels="false"
              clearable
              v-model="selectedOptions"
              :options="sourceOptions"
              expand-trigger="hover">
            </el-cascader>
          </el-form-item>
        </el-form>
      </div>
      <div class="operate-container">
        <i class="el-icon-tickets"></i>
        <span>数据列表</span>
        <el-button
          v-show="judgeAdmin()"
          class="btn-add"
          @click="handleAddSource()"
          size="mini">
          添加
        </el-button>
      </div>
      <!--数据表格-->
      <div class="table-container">
        <el-table
          v-loading="!this.regFlag.search"
          :data="tableData"
          height="250"
          border
          style="width: 100%">
          <el-table-column
            label="编号"
            width="120"
            align="center"
            prop="id">
          </el-table-column>

          <el-table-column
            prop="source_type"
            align="center"
            label="资源分类"
            width="180">
          </el-table-column>
          <el-table-column
            prop="source_name"
            align="center"
            label="资源名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="source_capacity"
            align="center"
            label="容量"
            width="180">
          </el-table-column>
          <el-table-column
            align="center"
            prop="description"
            label="描述">
          </el-table-column>

          <el-table-column
            width="200"
            align="center"
            prop="operation"
            label="操作">
            <template slot-scope="scope">
              <el-button-group v-show="judgeAdmin()">
                <el-button
                  plain
                  type="primary"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.row)"></el-button>
                <el-button
                  plain
                  type="danger"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"></el-button>
              </el-button-group>

              <el-button-group v-show="!judgeAdmin()">
                <el-button
                  size="small"
                  type="primary"
                  @click="handleApply(scope.$index, scope.row)">申请</el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="handleDebug(scope.$index, scope.row)">报修</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </el-card>
    <!--<div class="page-container">-->
      <!---->
    <!--</div>-->

    <!-- 对话框-->
    <!--1、管理员点击添加按钮弹出对话框-->
    <el-dialog title="添加资源" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" ref="addForm">
        <el-form-item label="资源名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入资源名称"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" :label-width="formLabelWidth" prop="type">
          <el-select v-model="addForm.type" placeholder="请选择资源所属分类">
            <el-option label="普通教室" value="common"></el-option>
            <el-option label="多媒体室" value="media"></el-option>
            <el-option label="会议室" value="meeting"></el-option>
            <el-option label="架空层" value="empty-space"></el-option>
            <el-option label="校道" value="school-way"></el-option>
            <el-option label="展栏" value="post-place"></el-option>
            <el-option label="休息室" value="rest-room"></el-option>
            <el-option label="自习室" value="self-room"></el-option>
            <el-option label="研讨室" value="study-room"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容量" :label-width="formLabelWidth" prop="capacity">
          <el-input v-model="addForm.capacity" autocomplete="off" placeholder="请输入容量：0或具体数值或不限"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
          <el-input v-model="addForm.description" autocomplete="off" placeholder="请输入相关的描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddDialogForm('addForm')">取 消</el-button>
        <el-button type="primary" @click="confirmAddDialogForm('addForm')">确 定</el-button>
        <el-button  @click="resetForm('addForm')">重置</el-button>
      </div>
    </el-dialog>

    <!--管理员点击编辑按钮弹出对话框-->
    <el-dialog title="编辑资源" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm">
        <el-form-item label="资源名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.source_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" :label-width="formLabelWidth">
          <el-select v-model="editForm.source_type" placeholder="请选择资源所属分类">
            <el-option label="普通教室" value="common"></el-option>
            <el-option label="多媒体室" value="media"></el-option>
            <el-option label="会议室" value="meeting"></el-option>
            <el-option label="架空层" value="empty-space"></el-option>
            <el-option label="校道" value="school-way"></el-option>
            <el-option label="展栏" value="post-place"></el-option>
            <el-option label="休息室" value="rest-room"></el-option>
            <el-option label="自习室" value="self-room"></el-option>
            <el-option label="研讨室" value="study-room"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容量" :label-width="formLabelWidth">
          <el-input v-model="editForm.source_capacity" autocomplete="off" placeholder="请输入容量：0或具体数值或不限"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="editForm.description" autocomplete="off" placeholder="请输入相关的描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditDialogForm()">取 消</el-button>
        <el-button type="primary" @click="confirmEditDialogForm()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

export default {
  data () {
    return {
      regFlag: { // 防止频繁点击，造成连续多次发请求
        search: true,
        delete: true,
        edit: true
      },
      selectedOptions: [],
      // 编辑资源
      editDialogFormVisible: false,
      // 添加资源的对话框数据
      addDialogFormVisible: false,
      addForm: {
        name: '',
        type: '',
        capacity: '',
        description: ''
      },
      // 编辑资源相关数据
      editForm: {
        source_name: '',
        source_type: '',
        source_capacity: '',
        description: ''
      },
      formLabelWidth: '120px',
      // 分页相关数据
      pageNum: 1, // 请求第几页
      totalCount: 0, // 总共多少条
      currentPage: 1, // 初始时在第几页
      pageSize: this.$store.state.pageSize, // 每页请求多少条
      curUserRole: 'admin1',
      listQuery: {
        sourceName: null,
        sourceNumber: null
      },
      tableData: [],
      defaultQuery: {
        keyword: '',
        typeNumber: ''
      },
      sourceOptions: [{
        value: 'classroom',
        label: '课室',
        children: [{
          value: 'common',
          label: '普通课室'
        }, {
          value: 'media',
          label: '多媒体室'
        }, {
          value: 'meeting',
          label: '会议室'
        }]
      }, {
        value: 'place',
        label: '场地',
        children: [{
          value: 'empty-space',
          label: '架空层'
        }, {
          value: 'school-way',
          label: '校道'
        }, {
          value: 'post-place',
          label: '展栏'
        }]
      }, {
        value: 'library',
        label: '图书馆资源',
        children: [{
          value: 'rest-room',
          label: '休息室'
        }, {
          value: 'self-room',
          label: '自习室'
        }, {
          value: 'study-room',
          label: '研讨室'
        }]
      }]
    }
  },
  created () {
    this.init()
    // console.log(this.listQuery.sourceNumber)
  },
  computed: {

  },
  methods: {
    // 判断角色
    judgeAdmin () {
      if (this.$store.state.userInfo['userType'] === 1) {
        this.curUserRole = '管理员'
        return true
      }
      // return this.curUserRole === 'admin'
    },
    // 初始化
    init () {
      this.onSearch()
    },
    handleSourceSearch () {
      // 按条件搜索资源
      let url = '/source/search'
      if (this.regFlag.search) {
        this.regFlag.search = false
        let params = {
          searchId: this.listQuery.sourceNumber,
          searchName: this.listQuery.sourceName,
          searchType: (this.selectedOptions.length === 0) ? null : this.selectedOptions[1],
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.$axios.post(url, params).then(res => {
          let resData = res.data
          if (resData.code === 200) {
            this.totalCount = resData.data.totalCount
            this.tableData = resData.data.list
            this.currentPage = this.pageNum
            this.$message.success(resData.message)
          } else {
            this.$message.error(resData.message)
            console.log('error')
          }
          this.regFlag.search = true
        })
      }
    },

    onSearch () {
      let url = '/source/list'
      if (this.regFlag.search) {
        this.regFlag.search = false
        let params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        // console.log(params)
        this.$axios.post(url, params).then(res => {
          let resData = res.data
          if (resData.code === 200) {
            this.totalCount = resData.data.totalCount
            this.tableData = resData.data.list
            // console.log(console.log(resData.data.list))
            this.currentPage = this.pageNum
            // this.$message.success(resData.message)
          } else {
            this.$message.error(resData.message)
            console.log('error')
          }
          this.regFlag.search = true
        })
      }
    },
    // 普通用户点击按钮方法
    handleApply (index, value) {
      this.$router.push({
        path: '/sourceApply',
        query: {
          id: index + 1
        }
      })
      this.$store.commit('getSourceName', value.source_name)
      this.$store.commit('getSourceType', value.source_type)
      // console.log(index)
      // console.log(value.source_name)
    },
    handleDebug (index, val) {
      this.$router.push({
        path: '/sourceRepair',
        query: {
          id: index + 1
        }
      })
      this.$store.commit('getSourceName', val.source_name)
      this.$store.commit('getSourceType', val.source_type)
    },
    // 添加数据的相关方法
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    cancelAddDialogForm (formName) {
      this.addDialogFormVisible = false
      this.$refs[formName].resetFields()
    },
    confirmAddDialogForm (formName) {
      // 发送请求，处理数据
      let params = {
        sourceName: this.addForm.name,
        sourceType: this.addForm.type,
        capacity: this.addForm.capacity,
        description: this.addForm.description
      }
      let url = '/source/add'
      this.$axios.post(url, params).then(res => {
        if (res.status === 200) {
          this.$message.success(res.data.msg)
        }
      })
      // 关闭弹窗
      this.addDialogFormVisible = false
      // 清空输入框
      this.$refs[formName].resetFields()
      // 重新获取数据
      this.onSearch()
    },
    // 分页方法：

    handleCurrentChange (val) {
      this.pageNum = val
      console.log(val)
      console.log(this.tableData)
      this.onSearch()
    },
    handleResetSearch () {
      this.selectedOptions = []
      this.listQuery.sourceName = null
      this.listQuery.sourceNumber = null
      this.pageNum = 1
      this.onSearch()
    },
    handleAddSource () {
      this.addDialogFormVisible = true
    },
    // 管理员点击删除或编辑按钮触发方法
    handleEdit (source) {
      console.log(source)
      this.$store.commit('getSourceId', source.id)
      this.editDialogFormVisible = true
      this.editForm = source
      // console.log(this.$store.state.curSourceId)
      // console.log(index, row)
    },
    // 编辑确定/取消方法
    cancelEditDialogForm () {
      this.editDialogFormVisible = false
      this.onSearch()
    },
    confirmEditDialogForm () {
      console.log(this.editForm)
      // 更新数据，发送请求
      if (this.regFlag.edit) {
        this.regFlag.edit = false
        let params = {
          editId: this.$store.state.curSourceId,
          sourceName: this.editForm.source_name,
          sourceType: this.editForm.source_type,
          capacity: this.editForm.source_capacity,
          description: this.editForm.description
        }
        let url = '/source/update'
        this.$axios.post(url, params).then(res => {
          if (res.status === 200) {
            console.log(res)
            this.$message.success(res.data.msg)
            this.onSearch()
          } else {
            this.$message.error(res.statusText)
          }
          this.regFlag.edit = true
        })
      }
      this.editDialogFormVisible = false
    },
    handleDelete (source) {
      console.log(source)
      this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确认后处理方法
        if (this.regFlag.delete) {
          this.regFlag.delete = false
          let userType = this.$store.state.userInfo['userType']
          let params = {
            userType: userType,
            sourceId: source.id
          }
          let url = '/source/delete'
          this.$axios.post(url, params).then(res => {
            if (res.status === 200) {
              this.$message.success(res.data.msg)
            } else {
              this.$message.error(res.data.msg)
            }
            this.onSearch()
          })
        }
        this.regFlag.delete = true
      }).catch(() => {
        // 点击取消后处理方法
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-add {
    float: right;
    font-size: 16px;
    margin: 0 auto;
  }
  .page-container {
    margin-top: 20px;
  }
</style>
