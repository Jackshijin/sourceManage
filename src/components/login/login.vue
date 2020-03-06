<template>
  <div class="page-login">
    <div class="login-header">
    </div>
    <div class="login-panel">
      <div class="banner">
        <img
          src="../../assets/img/bg.jpg"
          width="480"
          height="370"
          alt="jnu">
      </div>
      <div class="form">
        <h4
          v-if="error"
          class="tips"><i/>{{ error }}</h4>
        <p><span>校园资源管理系统</span></p>

        <el-input
          v-model="username"
          placeholder="请输入账号"/>
        <el-input
          v-model="password"
          placeholder="请输入密码"
          type="password"/>
        <div class="foot">
          <router-link to="/register">立即注册</router-link>
          <b>忘记密码？</b>
        </div>
        <el-button
          class="btn-login"
          @click.prevent = "handleLogin()"
          type="success"
          size="mini">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      checked: '',
      error: ''
    }
  },
  components: {
  },
  methods: {
    handleLogin () {
      this.$router.push({name: 'home'})
      this.$message.success('登录成功')
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/css/login/index";
</style>
