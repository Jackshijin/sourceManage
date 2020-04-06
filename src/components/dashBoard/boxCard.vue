<template>
  <el-card class="box-card-component" style="margin-left:8px;">
    <div slot="header" class="box-card-header">
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
    </div>
    <div class="box-title">校园资源管理系统---------------相关技术栈</div>
    <div style="position:relative;">
      <div style="padding-top:35px;" class="progress-item">
        <span>Vue</span>
        <el-progress :percentage="70" />
      </div>
      <div class="progress-item">
        <span>JavaScript</span>
        <el-progress :percentage="100" status="success"/>
      </div>
      <div class="progress-item">
        <span>Css</span>
        <el-progress :percentage="40" />
      </div>
      <div class="progress-item">
        <span>Mysql</span>
        <el-progress :percentage="50" />
      </div>
    </div>
  </el-card>
</template>

<script>

export default {
  filters: {
    statusFilter (status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    }
  }
}
</script>

<style lang="scss" >
  .box-card-component{
    .el-card__header {
      padding: 0 !important;
    }
  }
</style>
<style lang="scss" scoped>
  .box-card-component {
    .box-title {
      margin-bottom: 0;
    }
    .box-card-header {
      margin-top: 0;
      padding-top: 0;
      position: relative;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;
        &:hover {
          transform: scale(1.1, 1.1);
          filter: contrast(130%);
        }
      }
    }
    .progress-item {
      padding-top: 10px !important;
      margin-bottom: 10px;
      font-size: 14px;
    }
    @media only screen and (max-width: 1510px){
      .mallki-text{
        display: none;
      }
    }
  }
</style>
