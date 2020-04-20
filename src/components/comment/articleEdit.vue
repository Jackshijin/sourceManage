<template>
  <div class="article-edit-wrapper">
    <h3 class="v-line-icon">修改文章</h3>
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
      id: null,
      reqFlag: {
        edit: true
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
    getArticleDetail () {
      let url = '/article/detail'
      let params = {
        id: this.id
      }
      this.$axios.post(url, params).then(res => {
        if (res.status === 200) {
          // console.log(res.data)
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
    onSave (formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          const url = '/article/update'
          if (this.reqFlag.edit) {
            this.reqFlag.edit = false
            let params = {
              id: this.id,
              title: this.formData.title,
              summary: this.formData.summary,
              content: this.formData.content,
              comment: this.formData.comment
            }
            this.$axios.post(url, params).then(res => {
              if (res.status === 200) {
                this.$message.success(res.data.msg)
                this.onCancel(formData)
              }
              this.reqFlag.edit = true
            })
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
    // console.log(this.id)
    this.getArticleDetail()
  }
}
</script>

<style lang="scss">
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
