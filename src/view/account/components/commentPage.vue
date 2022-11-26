<!--评论区-->
<template>
  <div class="scrollable-y">
    <div style="text-align: center">
      <video class="head " width="250" controls ref="video">
        <source>
      </video>
    </div>
    <!--    <img :src="img" alt="">-->
    <div class="counts">{{xx}}条评论</div>
    <div class="scrollable-y ava">
      <div v-for="(i,index) in talks" class="comment ">
        <el-avatar :src="i.avatar_medium"></el-avatar>
        <div class="txts">
          <span>{{i.nickname}}</span>
          <span>{{i.text}}</span>
          <div class="other">
            <div style="width: 85%;">
              <span>{{i.days}}</span>
              <span>{{i.please}}</span>
              <!--二级标题组件-->
              <comment-second v-if="i.reply_comment_total > 0" :replyComment="i.reply_comment_total" :listId="i.comment_list_id"></comment-second>
<!--              <span class="head" v-if="i.reply_comment_total > 0"-->
<!--                    @click="second_comment(i.comment_list_id)">显示该评论回复信息（{{i.reply_comment_total}}）</span>-->
<!--              <span class="headBtn">回复</span>-->
            </div>
            <div>
              <span class="headBtn">👍{{i.digg_count}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--page分页-->
    <el-col :span="24" style="text-align: right;margin-top: 30px">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="limit"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
  import VideoPlayer from "../../../components/canvas/videoPlayer";
  import CommentSecond from "./commentSecond";

  export default {
    name: "commentPage",
    components: {
      CommentSecond,
      VideoPlayer,
    },
    props: {
      membervideo_id: String,
      required: true
    },
    data() {
      return {
        xx: null,
        talks: [],
        video_url: '',
        page: 1,
        limit: 5,
        commentSecond: false,
        total: null,
      }
    },
    mounted() {
      this.getVideo()
      this.getCom()
    },
    methods: {
      getVideo() {
        this.$api.memberView({
            membervideo_id: this.membervideo_id,
          },
          {
            params: {},
          })
          .then((res) => {
            console.log(res.data.data.video_url)
            this.video_url = res.data.data.video_url
          })
        // .catch((error) => {
        //   this.$message.error('请求错误')
        // })
      },
      getCom() {
        this.talks = []
        this.$api.commentList({
            page: this.page,
            limit: this.limit,
            membervideo_id: this.membervideo_id,
          },
          {
            params: {},
          })
          .then((res) => {
            this.talks = res.data.data.list
            this.xx = res.data.data.count
            console.log(res.data.data.list.length)
            this.total = res.data.data.count

          })
        // .catch((error) => {
        //   this.$message.error('请求错误')
        // })
      },
      second_comment(n) {
        this.commentSecond = true
        this.two_comment(n)
      },
      two_comment(comment_list_id) {
        this.$api.twoComment({
          comment_list_id,
        })
          .then(res => {
            console.log(res.data.data)
          })
      },
      handleSizeChange() {
      },
      handleCurrentChange(val) {
        this.page = val
        this.getCom()
      },
    },
    watch: {
      membervideo_id(n, o) {
        console.log(n)
        this.getVideo()
        this.getCom()
      },
      video_url(newValue, oldValue) {
        let video = this.$refs.video;
        video.src = this.video_url;
      }
    }
  }
</script>

<style lang="less" scoped>
  .ava {
    align-items: flex-start;
  }

  .scrollable-y {
    display: flex;

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
  }
</style>
