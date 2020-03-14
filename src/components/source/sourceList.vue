<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
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
          <el-form-item label="输入搜索：">
            <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item label="分类编号：">
            <el-input style="width: 203px" v-model="listQuery.typeNumber" placeholder="分类编号"></el-input>
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
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddSource()"
        size="mini">
        添加
      </el-button>
    </el-card>

    <!--数据表格-->
    <div class="table-container">
      <el-table
        :data="tableData"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          label="#"
          width="120"
          align="center"
          type="index">
        </el-table-column>

        <el-table-column
          prop="type"
          align="center"
          label="资源分类"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="capacity"
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
                @click="handleDelete()"></el-button>
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
    </div>

    <!--分页-->
    <div class="page-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!-- 对话框-->
    <!--1、管理员点击添加按钮弹出对话框-->
    <el-dialog title="添加资源" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm">
        <el-form-item label="资源名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" :label-width="formLabelWidth">
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
        <el-form-item label="容量" :label-width="formLabelWidth">
          <el-input v-model="addForm.capacity" autocomplete="off" placeholder="请输入容量：0或具体数值或不限"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="addForm.description" autocomplete="off" placeholder="请输入相关的描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddDialogForm()">取 消</el-button>
        <el-button type="primary" @click="confirmAddDialogForm()">确 定</el-button>
      </div>
    </el-dialog>

    <!--管理员点击编辑按钮弹出对话框-->
    <el-dialog title="添加资源" :visible.sync="editDialogFormVisible">
      <el-form :model="addForm">
        <el-form-item label="资源名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" :label-width="formLabelWidth">
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
        <el-form-item label="容量" :label-width="formLabelWidth">
          <el-input v-model="addForm.capacity" autocomplete="off" placeholder="请输入容量：0或具体数值或不限"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="addForm.description" autocomplete="off" placeholder="请输入相关的描述"></el-input>
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
      formLabelWidth: '120px',
      // 分页相关数据
      total: 100,
      pageNum: 1,
      pageSize: 2,
      curUserRole: 'admin1',
      listQuery: {
        keyword: '',
        typeNumber: ''
      },
      tableData: [{
        type: '课室',
        name: 'N201',
        capacity: '50',
        description: '这是一个小型教室，配有基本的上课用具'
      }, {
        type: '场地',
        name: 'T11前面空地',
        capacity: '不限',
        description: '场地较大，适合举办大型活动'
      }, {
        type: '图书馆',
        name: '休息室101',
        capacity: '1',
        description: '教师和个人均可申请的休息室'
      }, {
        type: '课室',
        name: 'N503',
        capacity: '60',
        description: '这是一个多媒体电脑语音室'
      }],
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
  methods: {
    // 普通用户点击按钮方法
    handleApply (index, value) {
      this.$router.push({
        path: '/sourceApply',
        query: {
          id: index + 1
        }
      })
      this.$store.commit('getSourceName', value.name)
      this.$store.commit('getSourceType', value.type)
      console.log(value)
    },
    handleDebug (index, val) {
      this.$router.push({
        path: '/sourceRepair',
        query: {
          id: index + 1
        }
      })
      this.$store.commit('getSourceName', val.name)
      this.$store.commit('getSourceType', val.type)
    },
    // 添加数据的相关方法
    cancelAddDialogForm () {
      this.addDialogFormVisible = false
    },
    confirmAddDialogForm () {
      // 发送请求，处理数据
      this.addDialogFormVisible = false
      // 提示成功
    },
    // 分页方法：
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    judgeAdmin () {
      return this.curUserRole === 'admin'
    },
    handleSearchList () {},
    handleResetSearch () {
      this.selectedOptions = []
      this.listQuery = this.defaultQuery
    },
    handleAddSource () {
      this.addDialogFormVisible = true
    },
    // 管理员点击删除或编辑按钮触发方法
    handleEdit (source) {
      this.editDialogFormVisible = true
      this.addForm = source
      // console.log(index, row)
    },
    // 编辑确定/取消方法
    cancelEditDialogForm () {
      this.editDialogFormVisible = false
    },
    confirmEditDialogForm () {
      this.editDialogFormVisible = false
    },
    handleDelete () {
      this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确认后处理方法
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
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
