<template>
  <div class="self-info">
    <el-card class="box-card">
      <div slot="header" class="card-title">
        <span><strong>个人信息</strong></span>
      </div>
      <el-row class="card-data">
        <el-col :span="8"><div class="grid-name grid-content">账号</div></el-col>
        <el-col :span="8"><div class="grid-role grid-content">角色</div></el-col>
        <el-col :span="8"><div class="grid-email grid-content">邮箱</div></el-col>
        <el-col :span="8"><div class="grid-role grid-content">{{name}}</div></el-col>
        <el-col :span="8"><div class="grid-email grid-content">{{role}}</div></el-col>
        <el-col :span="8"><div class="grid-name grid-content">{{email}}</div></el-col>
      </el-row>
      <el-button type="primary" plain class="card-btn" @click="goBack">返回</el-button>
    </el-card>

  </div>
</template>

<script>

export default {
  data () {
    return {
      name: '',
      role: '',
      email: ''
    }
  },
  created () {
    let info = JSON.parse(localStorage.getItem('userInfo'))
    this.name = info.userName
    this.role = info.userType > 1 ? '普通用户' : '管理员'
    this.email = info.userEmail || '空'
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .self-info {
    width: 600px;
    margin: 0 auto;
    .box-card {
      margin-top: 45px;
      .card-title {
        text-align: center;
        font-size: 20px;
      }
      .card-data {
        text-align: center;
        .grid-name {
          background: #99a9bf;
        }
        .grid-role {
          background: #d3dce6;
        }
        .grid-email {
          background: #e5e9f2;
        }
        .grid-content {
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .card-btn {
        float: right;
        margin: 20px 0;
      }
    }

  }
</style>
