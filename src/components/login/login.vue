<template>
  <div class="login-container">
    <el-form class="login-main sub-center-center" :model="formData" :rules="formRules" ref="formData" label-position="left" label-width="0px">
      <h3 class="title">校园资源管理系统登录</h3>
      <el-form-item prop="name">
        <el-input type="text" v-model="formData.name" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="formData.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type="primary" @click="submitLogin('formData')">登录</el-button>
        <el-button @click="resetForm('formData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    const validate = (rule, value, cb) => {
      const reg = /^[0-9a-zA-Z]*$/g
      if (!value) {
        cb(new Error('请输入内容'))
      } else if (!reg.test(value)) {
        cb(new Error('账号需为字母或数字'))
      } else {
        cb()
      }
    }
    return {
      formData: {
        name: null,
        password: null
      },
      formRules: {
        name: [
          { validator: validate, trigger: 'blur' }
        ],
        password: [
          { validator: validate, trigger: 'blur' }
        ]
      },
      regFlag: {
        login: true // 防止连续点击造成多次访问接口
      }
    }
  },
  components: {
  },
  methods: {
    submitLogin (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const url = '/user/login'
          if (this.regFlag.login) {
            this.regFlag.login = false
            let params = {
              name: this.formData.name,
              password: this.formData.password
            }
            this.$axios.post(url, params).then(res => {
              if (res.data.code === 200) {
                let data = res.data
                console.log(data)
                const userData = {
                  userId: data.id,
                  userName: data.name,
                  userType: data.type,
                  userEmail: data.email
                }
                this.$store.dispatch('saveUserInfo', userData)
                sessionStorage.setItem('userInfo', JSON.stringify(userData))
                // this.$router.push({name: 'selfInfo'})

                this.$message.success('登录成功')
                this.$router.push({name: 'dashBoard'})
              } else {
                this.$message.error('账号或密码不正确！')
              }
            })
          }
          this.regFlag.login = true
        } else {
          this.$message.error('Error Submit!')
        }
      })
      // this.$router.push({name: 'home'})
      // this.$message.success('登录成功')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
  .login-container{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100vw;
    height: 100vh;
    background-image:url('../../assets/img/login_bg.png');
    background-size: cover;
    overflow: hidden;
    .login-main{
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      background-clip: padding-box;
      width: 350px;
      padding: 35px 35px 15px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      h3{
        text-align: center;
      }
      .btn-box{
        text-align: center;
      }
    }
  }
</style>
