<template>
  <div class="dash-board">
    <el-row>
      <el-col :span="8">
        <div class="doc-title">
          <span>外部链接</span>
        </div>
        <div class="dov-nav">
          <doc-nav></doc-nav>
        </div>
      </el-col>
      <el-col :span="8"><todo-list></todo-list></el-col>
      <el-col :span="8" class="box-card"><box-card></box-card></el-col>
    </el-row>

  </div>
</template>

<script>
import DocNav from './docNav'
import TodoList from './todoList'
import BoxCard from './boxCard'
export default {
  components: {
    DocNav,
    TodoList,
    BoxCard
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
  .dash-board {

    .doc-title {
      width: 100%;
      color: #2db3a6;
      font-size: 23px;
      text-align: center;
      margin-bottom: 20px;
    }
    .doc-nav {

    }
    .box-card {
      margin-top: 5px;
      width: 30%;
    }
  }
</style>
