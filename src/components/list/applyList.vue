<template>
  <div class="apply-todo">
    <h3>待处理申请表</h3>
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
        prop="cause"
        label="用途">
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
        prop="name"
        width="150"
        label="创建人">
      </el-table-column>
      <el-table-column
        align="center"
        prop="create_time"
        width="200"
        label="创建时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="operation"
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleUpdate(scope.$index,scope.row)" v-show="!judgeAdmin">修改</el-button>
          <el-button type="text" @click="handleSubmit(scope.row)" v-show="!judgeAdmin">提交</el-button>
          <el-button type="text" @click="handleCheck(scope.row)" v-show="judgeAdmin">审核</el-button>
          <el-button type="text" @click="getDetail(scope.row)">详细信息</el-button>
        </template>
      </el-table-column>
    </el-table>

<!--修改申请表提示框-->
    <el-dialog title="修改申请表" :visible.sync="dialogFormVisible">
      <el-form :model="updateForm">
        <el-form-item label="资源名称" :label-width="formLabelWidth">
          <el-input v-model="updateForm.name" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="申请用途" :label-width="formLabelWidth">
          <el-input v-model="updateForm.cause" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="使用日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="updateForm.date"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="使用时间" :label-width="formLabelWidth">
          <el-time-select
            v-model="updateForm.time"
            :picker-options="{
            start: '07:30',
            step: '00:30',
            end: '20:30'
          }"
            placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="updateForm.comment" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancelUpdate()">取 消</el-button>
        <el-button type="primary" @click="handleSubmitUpdate()">确 定</el-button>
      </div>
    </el-dialog>

    <!--提交申请表弹出框-->
    <el-dialog
      title="注意"
      :visible.sync="dialogSubmitVisible"
      width="30%">
      <span>确定提交该申请表吗</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleCancelSubmit()">取 消</el-button>
    <el-button type="primary" @click="handleSubmitForm()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  inject: ['reload'],
  data () {
    return {
      curRole: null,
      updateIndex: null,
      sourceApplyId: null,
      tableData: [],
      sourceId: null,
      dialogFormVisible: false,
      dialogSubmitVisible: false,
      formLabelWidth: '120px',
      updateForm: {
        name: '',
        cause: '',
        date: '',
        time: '',
        comment: ''
      },
      // 日期相关数据
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  // activated () {
  //   this.getApplyList()
  // },
  created () {
    this.init()
    this.getCurRole()
    // console.log(this.$route.name)
  },
  computed: {
    judgeAdmin: function () {
      return this.$store.state.userInfo['userType'] === 1
    }
  },
  methods: {
    // 获取当前的角色
    getCurRole () {
      this.curRole = this.$store.state.userInfo['userType'] === 1 ? '管理员' : '普通用户'
    },
    // 审核相关方法
    handleCheck (list) {

    },
    // 提交提示框确定和取消方法
    handleCancelSubmit () {
      this.dialogSubmitVisible = false
    },
    handleSubmitForm () {
      let url = '/apply/submit'
      let params = {
        id: this.sourceApplyId
      }
      this.$axios.post(url, params).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.$message.success(res.data.msg)
          console.log(res.data.msg)
        }
      })
      this.dialogSubmitVisible = false
    },
    // 解决页面刷新问题
    // pageRefresh (name) {
    //   this.$router.replace({path: '/refresh', query: { name: name }})
    // },
    // 初始化
    init () {
      this.getApplyList()
    },
    // 取消和确认修改
    handleCancelUpdate () {
      this.dialogFormVisible = false
    },
    handleSubmitUpdate () {
      let url = '/apply/update'
      let params = {
        id: this.sourceId,
        cause: this.updateForm.cause,
        date: this.updateForm.date,
        time: this.updateForm.time,
        applyComment: this.updateForm.comment
      }
      this.$axios.post(url, params).then(res => {
        // console.log(res)
        // console.log(res.data)
        // console.log(this.tableData)
        if (res.status === 200) {
          this.$message.success(res.data.msg)
          this.dialogFormVisible = false
          this.reload()
        }
      })
      // this.pageRefresh(this.$route.name)
      // this.getApplyList()
      // this.$router.go(0) 页面会出现白屏，明显的停顿
    },
    getApplyList () {
      this.$axios.get('/apply/todo', {}).then(res => {
        if (res.status === 200) {
          let resData = JSON.parse(JSON.stringify(res.data.data.arr))
          resData.map(row => {
            if (row.create_time) {
              row.create_time = this.$moment(row.create_time).format('YYYY-MM-DD HH:mm:ss')
            }
          })
          // console.log(resData)
          // slice不会刷新数据
          // this.tableData = resData.slice(0)
          this.tableData = JSON.parse(JSON.stringify(resData))
          // this.tableData = resData
        }
      })
    },
    handleUpdate (index, list) {
      this.updateIndex = index
      // console.log(index)
      // console.log(list)
      this.dialogFormVisible = true
      this.sourceId = list.id
      this.updateForm.name = list.source_name
      this.updateForm.cause = list.cause
      // console.log(list)
      let params = {
        id: list.id
      }
      this.$axios.post('/apply/before-update', params).then(res => {
        if (res.status === 200) {
          let resData = res.data.data
          this.updateForm.comment = resData.comment
          this.updateForm.time = resData.apply_time
          this.updateForm.date = this.$moment(resData.apply_date).format('YYYY-MM-DD')
          // this.updateForm.date = resData.
          // console.log(resData)
        }
      })
    },
    handleSubmit (list) {
      this.sourceApplyId = list.id
      console.log(list)
      this.dialogSubmitVisible = true
    },
    getDetail (list) {
      console.log(list)
      this.$store.commit('getSourceApplyId', list.id)
      this.$router.push({name: 'applyDetail'})
    }
  }
}
</script>

<style lang="scss" scoped>
  .apply-todo {
    h3 {
      margin: 0 auto 20px;
      text-align: center;
    }
  }
</style>
