<template>
  <div class="pwd">
    <h3>修改密码</h3>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码" prop="originPwd">
        <el-input type="password" v-model="ruleForm2.originPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input type="password" v-model="ruleForm2.newPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkNewPwd">
        <el-input type="password" v-model="ruleForm2.checkNewPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data () {
    let validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.ruleForm2.newPwd === this.ruleForm2.originPwd) {
          callback(new Error('新密码不能与原密码相同'))
        } else {
          callback()
          // this.$refs.ruleForm2.validateField('newPwd')
        }
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.ruleForm2.newPwd) {
        callback(new Error('两次输入的新密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        originPwd: '',
        newPwd: '',
        checkNewPwd: ''
      },
      rules2: {
        originPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPwd: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        checkNewPwd: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = '/password'
          let params = {
            password: this.ruleForm2.originPwd,
            newPassword: this.ruleForm2.checkNewPwd
          }
          this.$axios.post(url, params).then(res => {
            if (res.status === 200) {
              this.$message.success(res.data.msg)
              // this.$router.replace('/')
            } else {
              this.$message.error(res.data.msg)
            }
            this.$refs[formName].resetFields()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
