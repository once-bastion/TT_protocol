<!--所有的视频素材列表-->
<template>
  <div style="position: relative">
    <el-col :span="24">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-popconfirm title="这是一段内容确定删除吗？" @confirm="deleteBtn">
        <el-button slot="reference" style="margin-left: 10px" type="text" :disabled="delDisabled">删除</el-button>
      </el-popconfirm>
      当前已选择 {{xx}} 个视频，选择发布请进入 视频发布 页面
    </el-col>
    <el-col class="videoList" :span="24" style="margin: 15px 0;">
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <!--图像显示区域-->
        <div v-for="(i,index) in infos" style="display: inline-block;position:relative;">

          <el-image class="head pics"
                    @click="toVideo(i)"
                    :src="i.pic"
                    fit="cover">
          </el-image>
        </div>
        <div class="checkbox">
          <el-checkbox v-for="(i,index) in lists" :label="i" :key="i" style="margin-bottom: 10px">
            <!--          <el-image-->
            <!--              style="width: 202.5px; height: 360px;border: 10px solid #ccc;"-->
            <!--              :src="infos[index].img"-->
            <!--              fit="cover">-->
            <!--          </el-image>-->
            <div style="">
              <div class="infoList">
                <span>视频编号：{{infos[index].video_num}}</span>
                <span>上传时间：{{infos[index].add_time}}</span></div>
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
        :before-close="handleClose" :on-success="handleAvatarSuccess">
      <!--   视频内容   -->
      <vue-core-video-player loop :src="source" :cover="cover" :title="title" autoplay></vue-core-video-player>
    </el-dialog>
  </div>
</template>

<script>
  // const cityOptions = ['上海','上海', '北京', '广州', '深圳'];
  import VueCoreVideoPlayer from "../vueVideo/VueCoreVideoPlayer";

  export default {
    name: "videoList",
    components: {VueCoreVideoPlayer},
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
  }</style>
