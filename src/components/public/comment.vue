<template>
  <div class="container">
    <div class="comment" v-for="(item,index) in comments" :key="index">
      <div class="info">
        <img class="avatar" :src="item.from_avatar" width="36" height="36"/>
        <div class="right">
          <div class="name">{{item.from_name}}</div>
          <div class="date">{{item.create_time}}</div>
        </div>
      </div>
      <div class="content">{{item.content}}</div>
      <div class="control">
        <span class="like" :class="{active: item.isLike}" @click="likeClick(item)">
          <i class="icon el-icon-star-off"></i>
          <span class="like-num">{{item.like_num > 0 ? item.like_num + '人赞' : '赞'}}</span>
        </span>
        <span class="comment-reply" @click="showInputOne(item)">
          <i class=" icon el-icon-edit-outline"></i>
          <span>回复</span>
        </span>
      </div>
      <div class="reply">
        <div class="item" v-for="reply in item.reply" :key="reply.id">
          <div class="reply-content">
            <span class="from-name">{{reply.from_name}}</span><span>: </span>
            <span class="to-name">@{{reply.to_name}}</span>
            <span>{{reply.content}}</span>
          </div>
          <div class="reply-bottom">
            <span>{{reply.date}}</span>
            <span class="reply-text" @click="showInputTwo(item, reply)">
              <i class="icon-comment el-icon-edit-outline"></i>
              <span>回复</span>
            </span>
          </div>
        </div>
        <div class="write-reply" v-if="item.reply.length > 0" @click="showInputThree(item)">
          <i class="el-icon-edit"></i>
          <span class="add-comment">添加新评论</span>
        </div>
        <transition name="fade">
          <div class="input-wrapper" v-if="showItemId === item.id">
            <el-input
              class="gray-bg-input"
              v-model="inputComment"
              type="textarea"
              :rows="3"
              autofocus
              placeholder="写下你的评论">
            </el-input>
            <div class="btn-control">
              <span class="cancel" @click="cancel">取消</span>
              <el-button class="btn" type="success" round @click="commitComment()">确定</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import * as imgUrl from '../../utils/imgUrl'
import Vue from 'vue'
export default {
  inject: ['reload'],
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  components: {},
  data () {
    return {
      inputComment: '',
      showItemId: '',
      commentFlag: false,
      replyFlag: false,
      commentArr: null,
      replyArr: null,
      likeClickFlag: true
    }
  },
  computed: {},
  methods: {
    // 点赞
    likeClick (item) {
      let url = '/comment/like'
      if (item.isLike === null) {
        Vue.$set(item, 'isLike', true)
        item.like_num++
        let params = {
          id: item.id,
          likeNum: item.like_num
        }
        this.$axios.post(url, params).then(res => {
          if (res.status === 200) {
            return res.data.msg
          } else {
            return res
          }
        })
      } else {
        if (item.isLike) {
          item.like_num--
          let params = {
            id: item.id,
            likeNum: item.like_num
          }
          this.$axios.post(url, params).then(res => {
            if (res.status === 200) {
              return res.data.msg
            } else {
              return res
            }
          })
        } else {
          item.like_num++
          let params = {
            id: item.id,
            likeNum: item.like_num
          }
          this.$axios.post(url, params).then(res => {
            if (res.status === 200) {
              return res.data.msg
            } else {
              return res
            }
          })
        }
        item.isLike = !item.isLike
      }
    },
    // 点击取消按钮
    cancel () {
      this.showItemId = ''
    },
    // 提交评论
    commitComment () {
      // 新的大评论
      if (!this.commentFlag && !this.replyFlag) {
        let url = '/comment/new'
        let params = {
          id: this.$store.state['userInfo'].userId,
          content: this.inputComment,
          fromAvatar: imgUrl.imgArr[~~(Math.random() * 14 + 1)]
        }
        this.$axios.post(url, params).then(res => {
          if (res.status === 200) {
            this.$message.success(res.data.msg)
            this.showItemId = ''
            this.reload()
          }
        })
      } else if (this.commentFlag && !this.replyFlag) {
        // 回复大评论
        let url = '/comment/reply'
        let params = {
          commentId: this.commentArr.id,
          fromId: this.$store.state['userInfo'].userId,
          fromAvatar: imgUrl.imgArr[~~(Math.random() * 14 + 1)],
          toId: this.commentArr.from_id,
          toName: this.commentArr.from_name,
          toAvatar: this.commentArr.from_avatar,
          content: this.inputComment
        }
        this.$axios.post(url, params).then(res => {
          this.$message.success(res.data.msg)
          this.showItemId = ''
          this.reload()
          console.log(res)
        })
      } else {
        // 回复小评论
        let url = '/comment/reply'
        let params = {
          commentId: this.commentArr.id,
          fromId: this.$store.state['userInfo'].userId,
          fromAvatar: imgUrl.imgArr[~~(Math.random() * 14 + 1)],
          toId: this.replyArr.from_id,
          toName: this.replyArr.from_name,
          toAvatar: this.replyArr.from_avatar,
          content: this.inputComment
        }
        this.$axios.post(url, params).then(res => {
          this.$message.success(res.data.msg)
          this.showItemId = ''
          this.reload()
          // console.log(res)
        })
      }

      // console.log(this.inputComment)
    },
    // 点击评论按钮显示输入框 item:当前大评论 reply:当前回复的评论
    showInputOne (item) {
      this.commentFlag = true
      this.replyFlag = false
      this.inputComment = ''
      this.showItemId = item.id
      this.commentArr = item
      console.log(item)
    },
    showInputTwo (item, reply) {
      this.commentFlag = true
      this.replyFlag = true
      this.inputComment = ''
      this.showItemId = item.id
      this.commentArr = item
      this.replyArr = reply
      console.log(item)
      console.log(reply)
    },
    showInputThree (item) {
      this.commentFlag = false
      this.replyFlag = false
      this.inputComment = ''
      this.showItemId = item.id
      console.log(item)
    },
    showCommentInput (item, reply) {
      if (reply) {
        this.inputComment = '@' + reply.from_name + ''
        console.log(item)
        console.log(reply)
      } else {
        this.inputComment = ''
      }
      this.showItemId = item.id
    }
  },
  created () {
    console.log(imgUrl)
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/css/color';
  .container {
    padding: 0 10px;
    box-sizing: border-box;
    .comment {
      display: flex;
      flex-direction: column;
      padding: 10px;
      border-bottom: 1px solid $border-fourth;
      .info {
        display: flex;
        align-items: center;
        .avatar {
          border-radius: 50%;
        }
        .right {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          .name {
            font-size: 16px;
            color: $text-main;
            margin-bottom: 5px;
            font-weight: 500;
          }
          .date {
            font-size: 12px;
            color: $text-minor;
          }
        }
      }
      .content {
        font-size: 16px;
        color: $text-main;
        line-height: 20px;
        padding: 10px 0;
      }
      .control {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: $text-minor;
        .like {
          display: flex;
          align-items: center;
          margin-right: 20px;
          cursor: pointer;
          &.active, &:hover {
            color: $color-main;
          }
          .icon {
            font-size: 14px;
            margin-right: 5px;
          }
        }
        .comment-reply {
          display: flex;
          align-items: center;
          cursor: pointer;
          &:hover {
            color: $text-333;
          }
          .icon {
            font-size: 16px;
            margin-right: 5px;
          }
        }
      }
      .reply {
        margin: 10px 0;
        border-left: 2px solid $border-first;
        .item {
          margin: 0 10px;
          padding: 10px 0;
          border-bottom: 1px dashed $border-third;
          .reply-content {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: $text-main;
            .from-name {
              color: $color-main;
            }
            .to-name {
              color: $color-main;
              margin-left: 5px;
              margin-right: 5px;
            }
          }
          .reply-bottom {
            display: flex;
            align-items: center;
            margin-top: 6px;
            font-size: 12px;
            color: $text-minor;
            .reply-text {
              display: flex;
              align-items: center;
              margin-left: 10px;
              cursor: pointer;
              &:hover {
                color: $text-333;
              }
              .icon-comment {
                margin-right: 5px;
              }
            }
          }
        }
        .write-reply {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $text-minor;
          padding: 10px;
          cursor: pointer;
          &:hover {
            color: $text-main;
          }
          .el-icon-edit {
            margin-right: 5px;
          }
        }
        .fade-enter-active, .fade-leave-active {
          transition: opacity 0.5s;
        }
        .fade-enter, .fade-leave-to {
          opacity: 0;
        }
        .input-wrapper {
          padding: 10px;
          .gray-bg-input, .el-input__inner {
            /*background-color: #67C23A;*/
          }
          .btn-control {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-top: 10px;
            .cancel {
              font-size: 16px;
              color: $text-normal;
              margin-right: 20px;
              cursor: pointer;
              &:hover {
                color: $text-333;
              }
            }
            .confirm {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
</style>
