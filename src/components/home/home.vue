<template>
    <el-container class="container">
      <el-header class="header">
        <el-row class="grid-row">
          <el-col :span="4" class="left-col">
            <img src="../../assets/img/jnu2.jpg" alt="无法加载图片">
          </el-col>
          <el-col :span="16" class="middle-col">
            <h1>校园资源管理系统</h1>
          </el-col>
          <el-col :span="4" class="right-col">
            <div class="user-img">
              <img src="../../assets/img/jnu.jpg" alt="无法加载图片">
              <div class="dropdown">
                <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link" >
                  {{ this.curUserName }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                  <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item command="toHome">首页</el-dropdown-item>
                    <el-dropdown-item>Github</el-dropdown-item>
                    <el-dropdown-item command="selfInfo">个人信息</el-dropdown-item>
                    <el-dropdown-item>消息</el-dropdown-item>
                    <el-dropdown-item command="logOut">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="container-second">
        <el-aside class="aside" width="200px">
          <el-menu unique-opened router>
            <el-menu-item index="dashBoard">
              <i class="el-icon-document"></i>
              <span slot="title">导航展示</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <svg-icon icon-class="ziyuan" className="icon"></svg-icon>
                <!--<i class="el-icon-location"></i>-->
                <span>资源管理</span>
              </template>
              <el-menu-item index="source">
                <svg-icon icon-class="resource" className="icon"></svg-icon>
                <span>资源列表</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <svg-icon icon-class="shuju" className="icon"></svg-icon>
                <span>数据统计</span>
              </template>
              <el-menu-item index="chartIndex">
                <svg-icon icon-class="forms" className="icon"></svg-icon>
                <!--<i class="el-icon-location"></i>-->
                <span>使用情况</span>
              </el-menu-item>
              <el-menu-item index="chartAnalyze">
                <svg-icon icon-class="data" className="icon"></svg-icon>
                <!--<i class="el-icon-location"></i>-->
                <span>数据分析</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <svg-icon icon-class="baobiao" className="icon"></svg-icon>
                <span>报表管理</span>
              </template>

              <el-menu-item index="applyList">
                <svg-icon icon-class="baobiao_1" className="icon"></svg-icon>
                <span>待处理申请表</span>
              </el-menu-item>

              <el-menu-item index="myApply">
                <svg-icon icon-class="liebiao" className="icon"></svg-icon>
                <span>个人申请表</span>
              </el-menu-item>

              <el-menu-item index="repairList" v-show="!judgeAdmin">
                <svg-icon icon-class="liebiao" className="icon"></svg-icon>
                <span>个人报修表</span>
              </el-menu-item>

              <el-menu-item index="repairDeal" v-show="judgeAdmin">
                <svg-icon icon-class="form" className="icon"></svg-icon>
                <span>待处理报修表</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <svg-icon icon-class="article" className="icon"></svg-icon>
                <span>建议&文章</span>
              </template>
              <el-menu-item index="suggest">
                <svg-icon icon-class="comment" className="icon"></svg-icon>
                <span>留言评论</span>
              </el-menu-item>
              <el-menu-item index="article">
                <svg-icon icon-class="post" className="icon"></svg-icon>
                <span>公告文章</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="6">
              <template slot="title">
                <svg-icon icon-class="personal" className="icon"></svg-icon>
                <span>个人中心</span>
              </template>
              <el-menu-item index="changePwd">
                <svg-icon icon-class="mima" className="icon"></svg-icon>
                <span>修改密码</span>
              </el-menu-item>
              <el-menu-item index="myArticle">
                <svg-icon icon-class="publish" className="icon"></svg-icon>
                <span>个人发表</span>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="7" v-show="judgeAdmin">
              <template slot="title">
                <svg-icon icon-class="usermanage" className="icon"></svg-icon>
                <span>用户管理</span>
              </template>
              <el-menu-item index="userManage">
                <svg-icon icon-class="permission" className="icon"></svg-icon>
                <span>权限管理</span>
              </el-menu-item>
            </el-submenu>

          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>

export default {
  data () {
    return {
      curUserName: '',
      curUserRole: ''
    }
  },
  computed: {
    judgeAdmin: function () {
      return this.$store.state.userInfo['userType'] === 1
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'logOut') {
        this.logOut()
      }
      if (command === 'toHome') {
        this.toHome()
      }
      if (command === 'selfInfo') {
        this.getSelfInfo()
      }
    },
    getSelfInfo () {
      this.$router.push({name: 'selfInfo'})
    },
    toHome () {
      // 当前页就是首页不跳转，处理报错
      if (this.$route.name === 'dashBoard') {
        this.$message.warning('当前页面就是首页')
      } else {
        this.$router.push({name: 'dashBoard'})
        console.log('去首页')
        // console.log(this.$route.name)
      }
    },
    logOut () {
      this.$axios.get('/user/logout', {}).then(res => {
        const data = res.data
        if (data.code === 200) {
          sessionStorage.clear()
          this.$store.dispatch('saveUserInfo', {})
          this.$router.replace('/')
          this.$message.success('退出成功')
        } else {
          this.$message.error('发生未知错误，请重试')
        }
      })
    }
  },
  created () {
    this.curUserName = this.$store.state.userInfo['userName']
    let curUserType = sessionStorage.getItem('userInfo').userType
    if (curUserType !== 1) {
      this.curUserRole = '普通用户'
    } else {
      this.curUserRole = '管理员'
    }
    // console.log(this.curUserRole)
    // console.log(this.curUserName)
  }
}
</script>

<style scoped lang="scss">
  .container {
    height: 100%;
    .header {
      padding: 0;
      background-color: #b3c0d1;
      .grid-row {
        height: 100%;
        .left-col {
          img {
            padding: 0;
            width: 200px;
            height: 60px;
          }
        }
        .middle-col {
          height: 100%;
          text-align: center;
          h1 {
            margin: 10px 0;
          }
        }
        .right-col {
          height: 100%;
          .user-img {
            height: 100%;
            img {
              @extend .user-img;
              margin-left: 70px;
              border-radius: 50%;
              text-align: center;
            }
            .dropdown {
              float: right;
              margin: 18px 30px 15px 30px;
              .el-dropdown-link {
                .el-icon--right {
                  font-size: 14px;
                }
              }

            }
          }

        }
      }
    }
    .container-second {
      .aside {
        background-color: #d3dce6;

        .icon {
          width: 1.3em;
          height: 1.2em;
          margin-right: 8px;
          vertical-align: center;
        }
        h3 {
          text-align: center;
        }
      }
      .main {
        /*background-color: #e9eef3;*/
      }
    }
  }
</style>
