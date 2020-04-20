<template>
  <div class="apply-detail">
    <h3>申请表详细</h3>
    <div class="top-line"></div>
    <div class="table-container">
      <div class="table-line"><span class="mid-text">基本信息</span></div>
      <div class="table-info">
        <el-table
          :data="tableInfo"
          style="width: 100%">
          <el-table-column
            prop="source_name"
            align="center"
            label="资源名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="cause"
            align="center"
            label="用途"
            width="250">
          </el-table-column>
          <el-table-column
            prop="applier"
            align="center"
            width="150"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="create_time"
            align="center"
            width="180"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="next_deal_role"
            align="center"
            width="150"
            label="待处理人">
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
            width="150"
            label="状态">
          </el-table-column>
        </el-table>

        <div class="table-line"><span class="mid-text">表单详细</span></div>
        <div class="table-detail">
          <el-table
            :data="tableDetail"
            style="width: 100%">
            <el-table-column
              prop="source_type"
              align="center"
              label="资源分类">
            </el-table-column>
            <el-table-column
              prop="apply_date"
              align="center"
              label="使用日期">
            </el-table-column>
            <el-table-column
              prop="apply_time"
              align="center"
              width="150"
              label="开始时间">
            </el-table-column>
            <el-table-column
              prop="comment"
              align="center"
              label="备注">
            </el-table-column>
          </el-table>
        </div>

        <div class="table-line"><span class="mid-text">处理流程</span></div>
        <div class="table-record">
          <el-table
            :data="tableRecord"
            max-height="250"
            style="width: 100%">
            <el-table-column
              prop="deal_user"
              align="center"
              label="处理人"
              width="180">
            </el-table-column>
            <el-table-column
              prop="deal_time"
              align="center"
              label="处理时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="deal_way"
              align="center"
              label="处理类型">
            </el-table-column>
            <el-table-column
              prop="deal_result"
              align="center"
              label="处理结果">
            </el-table-column>
            <el-table-column
              prop="comment"
              align="center"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-input
        v-model="inputComment"
        class="input-comment"
        placeholder="审核理由..."
        v-show="isShow">
        <i class="el-icon-edit-outline"/>
      </el-input>
      <el-button type="primary" class="btn-pass" @click="handlePass()" v-show="isShow">通过</el-button>
      <el-button type="primary" class="btn-reject" @click="handleReject()" v-show="isShow">拒绝</el-button>
      <el-button type="primary" class="btn-back" @click="handleBack()">返回</el-button>
    </div>
  </div>
</template>

<script>

export default {
  inject: ['reload'],
  data () {
    return {
      tableInfo: [],
      tableDetail: [],
      tableRecord: [],
      inputComment: ''
    }
  },
  computed: {
    isShow () {
      return this.$store.state.userInfo['userType'] === 1
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    handlePass () {
      let url = '/apply/agree'
      let params = {
        id: this.$store.state.sourceApplyId,
        comment: this.inputComment
      }
      this.$axios.post(url, params).then(res => {
        if (res.status === 200) {
          this.$message.success(res.data.msg)
        }
      })
      this.$router.go(-1)
      this.reload()
    },
    handleReject () {
      let url = '/apply/refuse'
      let params = {
        id: this.$store.state.sourceApplyId,
        comment: this.inputComment
      }
      this.$axios.post(url, params).then(res => {
        if (res.status === 200) {
          this.$message.success(res.data.msg)
        }
      })
      this.$router.go(-1)
      this.reload()
    },
    handleBack () {
      this.$router.go(-1)
    },
    getTableData () {
      let url = '/apply/detail'
      let params = {
        id: this.$store.state.sourceApplyId
      }
      this.$axios.post(url, params).then(res => {
        let tableInfo = res.data.info
        tableInfo.map(row => {
          if (row.create_time) {
            row.create_time = this.$moment(row.create_time).format('YYYY-MM-DD HH:mm:ss')
          }
        })
        let tableDetail = res.data.detail
        tableDetail.map(row => {
          if (row.apply_date) {
            row.apply_date = this.$moment(row.apply_date).format('YYYY-MM-DD')
          }
        })
        let tableRecord = res.data.record
        tableRecord.map(row => {
          if (row.deal_time) {
            row.deal_time = this.$moment(row.deal_time).format('YYYY-MM-DD HH:mm:ss')
          }
        })
        this.tableInfo = tableInfo
        this.tableDetail = tableDetail
        this.tableRecord = tableRecord
        // console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  /*.el-table__body-wrapper::-webkit-scrollbar {*/
    /*!*width: 0;宽度为0隐藏*!*/
    /*width: 0;*/
  /*}*/
  /*.el-table__body-wrapper::-webkit-scrollbar-thumb {*/
    /*border-radius: 2px;*/
    /*height: 50px;*/
    /*background: #eee;*/
  /*}*/
  /*.el-table__body-wrapper::-webkit-scrollbar-track {*/
    /*box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);*/
    /*border-radius: 2px;*/
    /*background: rgba(0, 0, 0, 0.4);*/
  /*}*/
  .apply-detail {
    h3 {
      margin: 0 auto 20px;
      text-align: center;
    }
    .top-line {
      border-top: solid 10px #1A94E6;
      width: 90%;
      margin: 0 auto;
    }
    .table-container {
      margin: 20px auto;
      width: 90%;
      background-color: #fff;
      .table-line {
        position: relative;
        margin: 20px auto;
        width: 94%;
        height: 1px;
        background-color: #d4d4d4;
        text-align: center;
        font-size: 16px;
        color: #656565;
        .mid-text {
          position: absolute;
          left: 50%;
          /*background-color: #e9eef3;*/
          background-color: #fff;
          padding: 0 15px;
          color: #1196EE;
          transform: translateX(-50%) translateY(-50%);
        }
      }
      .table-info {
      }
      .table-record {
        /*overflow: hidden;*/
      }
      .input-comment {
        width: 95%;
        margin: 20px 20px 0 20px;
      }
      .btn-pass {
        margin: 15px 10px 15px 850px;
        /*margin-top: 15px;*/
        /*margin-bottom: 15px;*/
        /*margin-left: 850px;*/
        /*margin-right: 30px;*/
      }
      .btn-back {
        margin-top: 15px;
        margin-bottom: 15px;
        float: right;
        margin-right: 40px;
      }
    }
  }
</style>
