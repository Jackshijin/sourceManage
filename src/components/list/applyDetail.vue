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
            width="180">
          </el-table-column>
          <el-table-column
            prop="cause"
            align="center"
            label="用途"
            width="180">
          </el-table-column>
          <el-table-column
            prop="applier"
            align="center"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="create_time"
            align="center"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="next_deal_role"
            align="center"
            label="待处理人">
          </el-table-column>
          <el-table-column
            prop="status"
            align="center"
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
              label="资源分类"
              width="180">
            </el-table-column>
            <el-table-column
              prop="apply_date"
              align="center"
              label="使用日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="apply_time"
              align="center"
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
            height="250"
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
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      tableInfo: [],
      tableDetail: [],
      tableRecord: []
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
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
        console.log(res)
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
    }
  }
</style>
