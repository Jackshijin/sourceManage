<template>
  <div class="article-add-wrapper">
    <h3 class="v-line-icon">新增文章</h3>
    <el-form ref="formData" :model="formData" :rules="formRules" label-width="110px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>

      <el-form-item label="摘要" prop="summary" class="quill-content">
        <quill-editor class="quill" style="height:260px; margin-bottom: 60px;" :options="editorOption" ref="QuillEditor" v-model="formData.summary">
        </quill-editor>
      </el-form-item>

      <el-form-item label="内容" prop="content" class="quill-content">
        <quill-editor style="height:260px; margin-bottom: 60px;" class="quill" :options="editorOption" ref="QuillEditor" v-model="formData.content">
        </quill-editor>
      </el-form-item>

      <el-form-item label="备注" prop="comment">
        <el-input v-model="formData.comment"></el-input>
      </el-form-item>

      <el-form-item class="dialog-footer" align="center">
        <el-button type="primary" @click="onSave('formData')">保 存</el-button>
        <el-button @click="onCancel('formData')">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
// import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      formData: {
        title: null,
        summary: null,
        content: null,
        comment: null
      },
      formRules: {
        title: [
          {required: true, message: '请输入文章标题', trigger: 'blur'}
        ],
        summary: [
          {required: true, message: '请填写文章/公告摘要', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请填写文章/公告内容', trigger: 'blur'}
        ]
      },
      reqFlag: {
        add: true
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }]
          ]
        }
      }
    }
  },
  methods: {
    onSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = '/article/add'
          // console.log(this)
          if (this.reqFlag.add) {
            this.reqFlag.add = false
            let params = {
              title: this.formData.title,
              summary: this.formData.summary,
              content: this.formData.content,
              comment: this.formData.comment
            }
            this.$axios.post(url, params).then(res => {
              if (res.status === 200) {
                this.$message.success(res.data.msg)
                this.onCancel(formName)
              }
              this.reqFlag.add = true
            })
          }
        }
      })
    },
    onCancel (formName) {
      this.$router.push({ path: '/article' })
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
  .article-add-wrapper {
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
    /*.quill {*/
      /*line-height: 40px;*/
    /*}*/
    /*.quill-content {*/
      /*height: 400px !important;*/
    /*}*/

  }
</style>
