<template>
  <div class="suggest">
    <comment :comments="commentData"></comment>
  </div>
</template>

<script>
// import * as CommentData from '../../utils/mockData'
import comment from '../public/comment'
export default {
  components: {
    comment
  },
  data () {
    return {
      commentData: [],
      comment: [],
      reply: []
    }
  },
  created () {
    // this.commentData = CommentData.comment.data
    this.getAllComment()
    // this.commentData = this.comment
  },
  methods: {
    getAllComment () {
      let url = '/comment/all'
      this.$axios.post(url, {}).then(res => {
        if (res.status === 200) {
          this.comment = res.data.data.comment
          this.reply = res.data.data.reply
          this.comment.forEach(item => {
            item['reply'] = []
          })
          this.comment.forEach(item => {
            for (let i = 0, len = this.reply.length; i < len; i++) {
              if (this.reply[i].comment_id === item.id) {
                item['reply'].push(this.reply[i])
              }
            }
          })
          this.commentData = this.comment
          console.log(this.comment)
        }
      })
    },
    handleData () {
      // console.log(this);
      // resData.forEach((indexOne,itemOne) => {
      //   for (let i = 0, len = reply.length; i < len; i++) {
      //     if (reply[i].comment_id === itemOne.id) {
      //       itemOne['reply'].push(reply[i])
      //     }
      //   }
      // })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
