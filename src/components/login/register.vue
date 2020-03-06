<template>
  <div class="page-register">
    <section>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="昵称"
          prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button
            size="mini"
            round
            @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="code">
          <el-input
            v-model="ruleForm.code"
            maxlength="4"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            type="password"></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="cpwd">
          <el-input
            v-model="ruleForm.cpwd"
            type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register">确认并注册</el-button>
          <el-button @click="resetForm('ruleForm')" class="reset-btn">重置</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      error: '',
      statusMsg: '',
      ruleForm: {
        pwd: '',
        email: '',
        code: '',
        cpwd: '',
        name: ''
      },
      rules: {
        name: [{
          required: true, type: 'string', message: '请输入昵称', trigger: 'blur'
        }],
        email: [{
          required: true, type: 'email', message: '请输入邮箱', trigger: 'blur'
        }],
        pwd: [{
          required: true, message: '创建密码', trigger: 'blur'
        }],
        cpwd: [{
          required: true, message: '确认密码', trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.pwd) {
              callback(new Error('两次输入的密码不一致！'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    sendMsg () {

    },
    register () {

    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
  .page-register {
    > section {
      margin: 0 auto 30px;
      padding-top: 30px;
      width: 980px;
      min-height: 300px;
      padding-right: 550px;
      box-sizing: border-box;

      .status {
        font-size: 12px;
        margin-left: 20px;
        color: #e6a23c;
      }

      .reset-btn {
        margin-left: 50px;
      }
      .error {
        color: red;
      }
    }
  }

</style>
