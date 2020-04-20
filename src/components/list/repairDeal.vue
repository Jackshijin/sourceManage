<template>
  <div class="repair-deal">
    <h3>待处理保修表</h3>
    <el-table
      :data="tableData"
      max-height="500"
      style="width: 100%">
      <el-table-column
        prop="id"
        align="center"
        label="编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="source_name"
        align="center"
        label="名称"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        prop="source_type"
        width="150"
        label="分类">
      </el-table-column>
      <el-table-column
        align="center"
        prop="bug"
        label="故障情况">
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        width="120"
        label="状态">
        <template slot-scope="scope">
          <el-tag type="warning">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="bugger"
        width="150"
        label="创建人">
      </el-table-column>
      <el-table-column
        align="center"
        prop="create_time"
        width="200"
        label="创建时间">
      </el-table-column>
      <el-table-column align="center" prop="operation" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain @click="handleBug(scope.$index,scope.row)">处理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--处理报修表弹窗-->
    <el-dialog title="处理报修" :visible.sync="bugFormVisible">
      <el-form label-position="right" label-width="80px" :model="bugForm">
        <el-form-item label="场地/教室">
          <el-input v-model="bugForm.source_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <el-input v-model="bugForm.source_type" disabled></el-input>
        </el-form-item>
        <el-form-item label="故障情况">
          <el-input v-model="bugForm.bug"></el-input>
        </el-form-item>
        <el-form-item label="报修人">
          <el-input v-model="bugForm.bugger" disabled></el-input>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-input v-model="bugForm.create_time" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="bugForm.status" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFinish()">已处理</el-button>
          <el-button type="primary" @click="contactHandle()">相关人员处理中</el-button>
          <el-button @click="handleCancelForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
  inject: ['reload'],
  data () {
    return {
      tableData: [],
      bugFormVisible: false,
      bugListId: null,
      bugForm: {
        source_name: '',
        source_type: '',
        bug: '',
        bugger: '',
        create_time: '',
        status: ''
      }
    }
  },
  methods: {
    handleFinish () {
      let url = '/bug/handled'
      let params = {
        id: this.bugListId
      }
      this.$axios.post(url, params).then(res => {
        if (res.status === 200) {
          this.$message.success(res.data.msg)
          this.reload()
        } else {
          this.$message.error('未知参数错误')
        }
      })
      this.bugFormVisible = false
    },
    contactHandle () {
      let url = '/bug/handling'
      let params = {
        id: this.bugListId
      }
      this.$axios.post(url, params).then(res => {
        if (res.status === 200) {
          this.$message.success(res.data.msg)
          this.reload()
        } else {
          this.$message.error('未知参数错误')
        }
      })
      this.bugFormVisible = false
    },
    handleCancelForm () {
      this.bugFormVisible = false
    },
    handleBug (index, value) {
      this.bugFormVisible = true
      this.bugForm = value
      this.bugListId = value.id
      // console.log(value)
    },
    getList () {
      let url = '/bug/todo'
      this.$axios.post(url, {}).then(res => {
        if (res.status === 200) {
          this.tableData = res.data.data
          // console.log(res)
        } else {
          this.$message.warning('无法获取数据')
        }
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
  .repair-deal {
    h3 {
      margin: 0 auto 20px;
      text-align: center;
    }
  }
</style>
