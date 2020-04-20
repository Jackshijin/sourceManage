<template>
  <div class="my-apply">
    <h3>个人申请表</h3>
    <el-table
      :data="myData"
      max-height="500"
      style="width: 100%">
      <el-table-column
        prop="id"
        align="center"
        label="编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="source_name"
        align="center"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="cause"
        width="300"
        label="用途">
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        width="180"
        label="状态">
        <template slot-scope="scope">
          <el-tag type="warning">{{scope.row.status}}</el-tag>
        </template>
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
          <el-button type="text" @click="getMyDetail(scope.row)">详细信息</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>

export default {
  data () {
    return {
      myData: []
    }
  },
  created () {
    this.getMyApply()
  },
  methods: {
    // 详细信息
    getMyDetail (list) {
      this.$store.commit('getSourceApplyId', list.id)
      this.$router.push({ name: 'applyDetail' })
    },
    // 获取个人申请表
    getMyApply () {
      let url = '/apply/history'
      this.$axios.post(url, {}).then(res => {
        if (res.status === 200) {
          let resData = res.data.arr
          resData.map(row => {
            if (row.create_time) {
              row.create_time = this.$moment(row.create_time).format('YYYY-MM-DD HH:mm:ss')
            }
          })
          this.myData = resData
          // console.log(res.data)
        }
        // console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .my-apply {
    h3 {
      margin: 0 auto 20px;
      text-align: center;
    }
  }
</style>
