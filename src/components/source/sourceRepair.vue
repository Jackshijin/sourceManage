<template>
  <div class="repair-container">
    <h3>资源报修表</h3>
    <el-form label-position="right" label-width="80px" :model="repairForm">
      <el-form-item label="场地/教室">
        <el-input v-model="repairForm.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-input v-model="repairForm.type" disabled></el-input>
      </el-form-item>
      <el-form-item label="故障情况">
        <el-input v-model="repairForm.problem"></el-input>
      </el-form-item>
      <el-form-item label="报修人">
        <el-input v-model="repairForm.submitPeople" disabled></el-input>
      </el-form-item>
      <el-form-item label="提交时间">
        <el-input v-model="repairForm.submitTime" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmitForm('repairForm')">提交</el-button>
        <el-button @click="handleRepairCancelForm('repairForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import formatDateTime from '../../utils/dateFormat'
export default {
  data () {
    return {
      repairForm: {
        name: '',
        type: '',
        problem: '',
        submitTime: '',
        submitPeople: ''
      }
    }
  },
  created () {
    this.repairForm.name = this.$store.state.curSourceName
    this.repairForm.type = this.$store.state.curSourceType
    this.repairForm.submitPeople = this.$store.state.userInfo['userName']
    this.repairForm.submitTime = formatDateTime(new Date())
  },
  methods: {
    handleSubmitForm (formName) {
      // 发送请求
      let url = '/bug/create'
      let params = {
        sourceName: this.repairForm.name,
        sourceType: this.repairForm.type,
        bug: this.repairForm.problem,
        bugger: this.repairForm.submitPeople,
        createTime: this.repairForm.submitTime
      }
      this.$axios.post(url, params).then(res => {
        if (res.status === 200) {
          this.$message.success(res.data.msg)
        }
      })
      // 清空输入框
      this.$router.push({ path: '/source' })
      this.$refs[formName].resetFields()
    },
    handleRepairCancelForm (formName) {
      this.$router.push({ path: '/source' })
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">

</style>
