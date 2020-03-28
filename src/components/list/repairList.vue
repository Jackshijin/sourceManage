<template>
  <div class="repair-list">
    <h3>报修表</h3>
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

    </el-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getRepairList()
  },
  methods: {
    getRepairList () {
      let url = '/bug/list'
      this.$axios.post(url, {}).then(res => {
        if (res.status === 200) {
          this.tableData = res.data.data
          console.log(res)
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
