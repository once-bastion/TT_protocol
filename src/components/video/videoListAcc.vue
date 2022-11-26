<!--所有的视频素材列表-->
<template>
  <div style="position: relative">
    <!--  弹框页  -->
    <el-dialog
        title="视频评论"
        :visible.sync="innerVisible"
        center
        width="30%"
        :before-close="handleClose"
        :modal="false">
      <comment-page :membervideo_id="membervideo_id"></comment-page>
    </el-dialog>
    <el-col :span="24" style="margin-bottom: 20px">
      <!--      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
      <!--      <el-popconfirm title="T﹏T  确定要删除吗" @confirm="deleteBtn">-->
      <!--        <el-button slot="reference" style="margin-left: 10px" type="text" :disabled="delDisabled">删除</el-button>-->
      <!--      </el-popconfirm>-->
      <!--      当前已选择 {{total}} 个视频-->
    </el-col>
    <el-col :span="24">
      <!--      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
      <!--图像显示区域-->

      <div class="checkboxs">
        <!--          <el-checkbox v-for="(i,index) in infos" :label="i" :key="i.material_id" style="margin-bottom: 10px">-->
        <div v-for="(i,index) in infos" class="checkbox" style="margin-bottom: 10px">
          <div style="">
            <div class="infoList">
              <!--                <span>视频编号：{{i.video_num}}</span>-->
              <p class="headBtn" @click="comments(i.membervideo_id,i.video_url)">评论数量：{{i.comment_count}}</p>
              <p>点赞教量：{{i.digg_count}}</p>
              <p>分享数量：{{i.share_count}}</p>
              <p>播放数量：{{i.play_count}}</p>
              <p style="height: 50px;">视频描述：{{i.video_desc}}</p>
              <!--          <span>视频链接地址：{{i.video_url}}</span>-->
              <!--          <span>视频动画封面：{{i.video_pic_url}}</span>-->
              <!--          <span class="el-icon-warning" @click="">仅自己可见</span>-->
              <video-player class="head pics" @click="" :src="i.video_url"></video-player>
            </div>
          </div>

        </div>
        <!--          </el-checkbox>-->
      </div>
      <!--      </el-checkbox-group>-->
    </el-col>
    <!--page分页-->
    <el-col :span="24" style="text-align: right;margin: 30px 0;">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="limit"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
    </el-col>
    <!--  弹出框内容  -->
    <!--    <el-dialog-->
    <!--        title="视频内容"-->
    <!--        :visible.sync="innerVisible"-->
    <!--        width="30%"-->
    <!--        :before-close="handleClose" :on-success="handleAvatarSuccess">-->
    <!--    </el-dialog>-->
  </div>
</template>

<script>
  // 引入公共的bug，来做为中间传达的工具
  import Bus from '../../utils/bus'
  // const cityOptions = ['上海','上海', '北京', '广州', '深圳'];
  import VueCoreVideoPlayer from "../vueVideo/VueCoreVideoPlayer";
  import VideoPlayer from "../canvas/videoPlayer";
  import CommentPage from "../../view/account/components/commentPage";

  export default {
    name: "videoList",
    components: {CommentPage, VideoPlayer,},
    props: {
      infos: Array,
      total: Number,
      required: true,
    },
    data() {
      return {
        checkAll: false,
        checkedCities: [],
        lists: [],//cityOptions
        isIndeterminate: true,
        imgs: [],
        xx: null,
        delDisabled: true,
        deleteData: [],//需要删除的
        innerVisible: false,
        limit: 12,
        //视频模块数据-----------------
        source: '',
        title: '',
        cover: 'cover',
        membervideo_id:'',
      }
    },
    created() {
      console.log(this.total)
    },
    methods: {
      comments(n, v) {
        // console.log(n, v)
        this.innerVisible = true
        this.membervideo_id = n
        Bus.$emit('val', v)
      },
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.lists : [];
        this.delDisabled = !val;
        this.isIndeterminate = false;
        // console.log(this.lists)
        this.deleteData = this.lists
        // console.log(this.lists.length)
      },
      handleCheckedCitiesChange(value) {
        // console.log(value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.imgs.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.imgs.length;
        this.delDisabled = checkedCount === 0
        this.deleteData = value
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(pageVal) {
        console.log(pageVal);
        this.$emit('pageChange', pageVal)
      },
      // toVideo(n) {
      //   console.log(n)
      //   this.source = n.video_url
      //   this.title = '视频编号：' + n.video_num
      //   this.innerVisible = true
      // },
      handleClose(done) {
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        done();
        // })
        // .catch(_ => {
        // });
      },
      async handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res)
        this.pic = res.data
      },
      deleteBtn() {
        // console.log(this.deleteData)
        this.deleteData.forEach((e, index) => {
          var i = [];
          this.deleteData[index] = parseInt(e)
        })
        let material_ids = this.deleteData.toLocaleString()
        this.$emit('remove', material_ids)
      }
    },
    watch: {
      infos(newVal, oldVal) {
        console.log(newVal)
        //     // this.lists = []
        //     // newVal.forEach((e, index) => {
        //     //   this.lists[index] = e
        //     // })
        //     // console.log(this.lists)
      },
      // total(newVal, oldVal) {
      //   console.log(newVal)
      //   this.total = newVal//规定页码
      // }
    }
  }
</script>

<style lang="less" scoped>


  .checkbox {
    /*position: absolute;*/
    /*top: 65px;*/
    /*margin-bottom: 390px;*/

    .infoList {
      /*height: 440px;*/
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }

  .pics {
    width: 205px;
    height: 368px;
    border: 10px solid #ccc;
    margin: 10px 0 0 0;
  }

  .checkboxs {
    display: flex;
    flex-wrap: wrap;

    .checkbox {
      margin: 0 28px;
      width: 13%;


    }
  }
</style>
