<template>
  <div class="apply-container">
    <h3>填写申请表</h3>
    <el-form :model="applyForm" :rules="applyFormRules" ref="applyForm" label-width="100px" class="demo-applyForm">
      <el-form-item label="资源名称" prop="name">
        <el-input v-model="applyForm.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="所属分类" prop="kind">
        <el-input v-model="applyForm.kind" disabled></el-input>
      </el-form-item>
      <el-form-item label="使用日期" required>
        <el-date-picker
          v-model="applyForm.date"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="使用时间" required>
        <el-time-select
          v-model="applyForm.time"
          :picker-options="{
            start: '07:30',
            step: '00:30',
            end: '20:30'
          }"
          placeholder="选择时间">
        </el-time-select>
      </el-form-item>
      <el-form-item label="申请用途" prop="cause">
        <el-input v-model="applyForm.cause"></el-input>
      </el-form-item>
      <el-form-item label="申请人" prop="applier">
        <el-input v-model="applyForm.applier"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input v-model="applyForm.desc"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('applyForm')">立即申请</el-button>
        <el-button @click="handleCancelForm('applyForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      regFlag: true,
      timeValue: '',
      dateValue: '',
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
      },
      applyForm: {
        name: '',
        kind: '',
        date: '',
        time: '',
        applier: '',
        desc: '',
        cause: ''
      },
      applyFormRules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
        kind: [
          { required: true, message: '请选择资源分类', trigger: 'change' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        time: [
          { type: 'time', required: true, message: '请选择时间', trigger: 'change' }
        ],
        applier: [
          { required: true, message: '请输入申请人', trigger: 'blur' }
        ],
        cause: [
          { required: true, message: '请填写用途/理由', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.applyForm.name = this.$store.state.curSourceName
    this.applyForm.kind = this.$store.state.curSourceType
    this.applyForm.applier = this.$store.state.userInfo['userName']
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.regFlag) {
            this.regFlag = false
            let url = '/apply/create'
            let params = {
              sourceName: this.applyForm.name,
              sourceType: this.applyForm.kind,
              applyDate: this.applyForm.date,
              applyTime: this.applyForm.time,
              cause: this.applyForm.cause,
              applyComment: this.applyForm.desc
            }
            this.$axios.post(url, params).then(res => {
              if (res.status === 200) {
                this.$message.success(res.data.msg)
                this.$router.go(-1)
              } else {
                this.$message.error(res.statusText)
              }
              console.log(res.status)
              console.log(res.data)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
        this.regFlag = true
      })
      this.$refs[formName].resetFields()
    },
    handleCancelForm (formName) {
      this.$router.push({ path: '/source' })
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
  .apply-container {
    h3 {
      text-align: center;
    }
  }
</style>
