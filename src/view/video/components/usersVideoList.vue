<!--所有的视频素材列表-->
<template>
  <div style="position: relative">
    <el-col :span="24">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-popconfirm title="T﹏T  确定要删除吗" @confirm="deleteBtn">
        <el-button slot="reference" style="margin-left: 10px" type="text" :disabled="delDisabled">删除</el-button>
      </el-popconfirm>
      当前已选择 {{xx}} 个视频，选择发布请进入 视频发布 页面
      <div class="scrollable-x tops01" v-if="$route.path === '/usersVideo'">
        视频任务名称：
        <el-input v-model="nameInput" clearable style="width: 200px;margin-right: 20px;"></el-input>
        视频描述：
        <el-input v-model="descriptionInput" type="textarea" clearable
                  style="width: 200px;margin-right: 20px;"></el-input>
        <!--时间表-->
        <change-time @getDate="releaseWay" @getJust="releaseOnce" style="margin-right: 20px;"></change-time>

        <el-button @click="released()" type="primary">发布按钮</el-button>
      </div>
    </el-col>

    <el-col :span="24" style="min-height: 1000px;">
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <!--图像显示区域-->

        <div class="checkbox">
          <el-checkbox v-for="(i,index) in infos" :label="i.video_num" :key="i.video_num"
                       style="margin-bottom: 10px;max-height:700px;">
            <div style="">
              <div class="infoList">
                <span>视频编号：{{i.video_num}}</span>
                <span>上传时间：{{i.add_time}}</span>
                <video-player class="head pics" @click="toVideo(i)" :src="i.video_url"></video-player>
              </div>
            </div>
          </el-checkbox>
        </div>
      </el-checkbox-group>
    </el-col>
    <!--page分页-->
    <el-col :span="24" style="text-align: right;margin: 30px 0;">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="12"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
    </el-col>
    <!--  弹出框内容  -->
    <el-dialog
        title="视频内容"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        :on-success="handleAvatarSuccess">
    </el-dialog>
  </div>
</template>

<script>
  // const cityOptions = ['上海','上海', '北京', '广州', '深圳'];
  // import VueCoreVideoPlayer from "../vueVideo/VueCoreVideoPlayer";
  import VideoPlayer from "../../../components/canvas/videoPlayer";
  import ChangeTime from "./changeTime";

  export default {
    name: "userVideoList",
    components: {ChangeTime, VideoPlayer},
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
        dialogVisible: false,
        //视频模块数据-----------------
        source: '',
        title: '',
        cover: 'cover',

        //发布数据
        nameInput: '',
        descriptionInput: '',

        radio: '',
        vaule2: '',
      }
    },
    created() {
      console.log(this.infos)
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.lists : [];
        this.delDisabled = !val;
        this.isIndeterminate = false;
        console.log(this.lists)
        this.deleteData = this.lists
        // console.log(this.lists.length)
      },
      handleCheckedCitiesChange(value) {
        console.log(value)
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
      toVideo(n) {
        console.log(n)
        this.source = n.video_url
        this.title = '视频编号：' + n.video_num
        this.dialogVisible = true
      },
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
        // // console.log(this.deleteData)
        // this.deleteData.forEach((e, index) => {
        //   var i = [];
        //   this.deleteData[index] = parseInt(e)
        // })
        // let material_ids = this.deleteData.toLocaleString()
        // this.$emit('remove', material_ids)
      },
      released() {
        this.deleteData.forEach((e, index) => {
          // var i = [];
          console.log(e)
          this.deleteData[index] = e
        })
        let video = this.deleteData.toLocaleString()
        console.log(video)
        this.$emit('release', video, this.nameInput, this.descriptionInput, this.radio,
          this.value2)
      },
      releaseWay(radio, value2) {
        console.log(value2)
        this.radio = radio
        this.value2 = value2
      },
      releaseOnce(radio) {
        this.radio = radio
      },
    },
    watch: {
      infos(newVal, oldVal) {
        // console.log(newVal)
        this.lists = []
        newVal.forEach((e, index) => {
          this.lists[index] = e.material_id
        })
        // console.log(this.lists)
      }
    }
  }
</script>

<style lang="less" scoped>


  .checkbox {
    width: 88vw;
    position: absolute;
    top: 65px;
    margin-bottom: 390px;

    .infoList {
      height: 440px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }

  .pics {
    width: 207px;
    height: 368px;
    border: 10px solid #ccc;
    margin: 10px 35px 50px 0;
    z-index: 2;
  }

  .tops01 {
    width: 65vw;
    float: right;
    align-items: center;
  }
</style>
