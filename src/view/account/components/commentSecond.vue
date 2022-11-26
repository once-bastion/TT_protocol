<template>
  <div>
<!--  请求按钮只请求一次  -->
    <el-link type="info" @click.once="second_comment()">查看评论回复（{{replyComment}}）</el-link>
    <div v-for="(i,index) in talks" class="comment ">
      <el-avatar :src="i.avatar_medium"></el-avatar>
      <div class="txts">
        <span>{{i.nickname}}</span>
        <span>{{i.text}}</span>
        <div class="other">
          <div>
            <span>{{i.days}}</span>
            <span>{{i.please}}</span>
            <span class="head" v-if="i.reply_comment_total > 0"
            >显示该评论回复信息（{{i.reply_comment_total}}）</span>
            <!--                <span class="headBtn">回复</span>-->
          </div>
          <div>
            <span class="headBtn">👍{{i.digg_count}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "commentSecond",
    props: {
      replyComment: String,
      listId: String,
    },
    data() {
      return {
        commentSecond: false, talks: [],
      }
    },
    mounted() {
    },
    methods: {
      second_comment() {
        console.log(1)
        this.commentSecond = true
        this.two_comment()
      },
      two_comment() {
        this.$api.twoComment({
          comment_list_id: this.listId,
        })
          .then(res => {
            console.log(res.data.data)
            this.talks = res.data.data

          })
      },
    }
  }
</script>

<style lang="less" scoped>
  .pics {
    text-align: center;
    margin-bottom: 10px;
  }

  .counts {
    text-align: center;
  }

  .comment {
    margin-top: 30px;
    /*width: 85%;*/
    justify-content: center;
  }

  .comment, .txts, .other {
    display: flex;
    width: 100%;

    .txts {
      flex-direction: column;

      span:nth-child(1),
      span:nth-child(3) {
        color: #99a9bf;
      }

      .other {
        margin-top: 10px;

        span:nth-child(1),
        span:nth-child(2) {
          color: #99a9bf;
          margin-right: 10px;
        }

        span:nth-child(3) {
          color: #7a7a7a;
        }

        display: flex;
        justify-content: space-between;
      }
    }
  }

</style>
