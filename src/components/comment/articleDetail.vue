<template>
  <div class="article-detail-wrapper">
    <h3 class="v-line-icon">文章详情</h3>
    <el-form ref="formData" :model="formData" :rules="formRules" label-width="110px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="summary">
        <div class="content-box summary" v-html="formData.summary"></div>
      </el-form-item>

      <el-form-item label="内容" prop="content">
        <div class="content-box content" v-html="formData.content"></div>
      </el-form-item>

      <el-form-item label="相关备注" prop="comment">
        <el-input v-model="formData.comment" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item class="dialog-footer" align="center">
        <el-button @click="onCancel('formData')">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      id: null,
      formData: {
        title: null,
        summary: null,
        content: null,
        comment: null
      },
      formRules: {}
    }
  },
  methods: {
    getArticleDetail () {
      let url = '/article/detail'
      let params = {
        id: this.id
      }
      this.$axios.post(url, params).then(res => {
        // console.log(res)
        if (res.status === 200) {
          // console.log(res)
          let data = res.data.data
          this.formData = {
            title: data.title,
            summary: data.summary,
            content: data.content,
            comment: data.comment
          }
        }
      })
    },
    onCancel (formName) {
      // this.$router.push({ path: '/article' })
      this.$router.go(-1)
      this.$refs[formName].resetFields()
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getArticleDetail()
  }
}
</script>

<style lang="scss">
  .content-box {
    display: block;
    /*height: 300px;*/
    padding: 5px 15px;
    line-height: 1.5;
    font-size: inherit;
    box-sizing: border-box;
    border: 1px solid #E4E7ED;
    border-radius: 4px;
    resize: vertical;
    cursor: not-allowed;
    background-color: #F5F7FA;
    /*background-color: #888;*/
  }
  .summary {
    height: 120px;
  }
  .content {
    height: 300px;
  }
  .v-line-icon{
    position: relative;
    padding-left: 9px
  }
  .v-line-icon:before{
    position: absolute;
    content: "";
    width: 4px;
    height: 18px;
    left: 0;
    top: 50%;
    margin-top: -9px;
    border-radius: 2px;
    background: #ff4200
  }

</style>
