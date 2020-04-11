<template>
  <div class="document-container">
    <el-row :gutter="10" type="flex">
      <el-col>
        <a class="document-btn" target="_blank" href="https://cn.vuejs.org/">Vue.js官网</a>
      </el-col>
      <el-col>
        <a class="document-btn" target="_blank" href="https://www.expressjs.com.cn/">Express.js官网</a>
      </el-col>

    </el-row>

    <el-row :gutter="10" type="flex">
      <el-col>
        <a class="document-btn" target="_blank" href="https://element.eleme.cn/#/zh-CN">ElementUI</a>
      </el-col>
      <el-col>
        <a class="document-btn" target="_blank" href="https://www.echartsjs.com/zh/">Echarts图表</a>
      </el-col>
    </el-row>

    <el-row :gutter="10" type="flex">
      <el-col>
        <a class="document-btn" target="_blank" href="https://www.jnu.edu.cn/">学校官网</a>
      </el-col>
      <el-col>
        <a class="document-btn" target="_blank" href="https://jwc-443.webvpn.jnu.edu.cn/">教务处</a>
      </el-col>
    </el-row>

    <el-row :gutter="10" type="flex">
      <el-col>
        <a class="document-btn" target="_blank" href="https://lib.jnu.edu.cn/">图书馆</a>
      </el-col>
      <el-col>
        <a class="document-btn" target="_blank" href="https://netc.jnu.edu.cn/">网络技术中心</a>
      </el-col>
    </el-row>

    <!--<a class="document-btn" target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">Express.js</a>-->
    <!--<a class="document-btn" target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">Mysql</a>-->
    <!--<a class="document-btn" target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">Element</a>-->
    <!--<a class="document-btn" target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">Axios</a>-->
    <!--<a class="document-btn" target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">Echarts</a>-->
  </div>
</template>

<script>

export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .document-container {
    /*background: #F0F2F5;*/
    width: 100%;
    /*margin: 50px;*/
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    /*justify-content: start;*/
    .document-btn {
      /*flex-shrink: 0;*/
      flex: 1;
      display: block;
      cursor: pointer;
      /*background: black;*/
      background: #09F7F7;
      color: white;
      height: 60px;
      width: 200px;
      margin: 10px 10px 50px 10px;
      line-height: 60px;
      font-size: 20px;
      text-align: center;
    }
  }
</style>
