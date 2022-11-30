<template>
  <div>
    <el-col :span="24">
      <h1 class="title">视频素材</h1>
    </el-col>
    <el-col :span="24">
      <!--  上传组件  -->
      <div v-for="(i,index) in numsInfo">
        <upload-file style="justify-content: flex-start;" :value="i.value" :keys="i.key"
                     @dialog="visible"></upload-file>
      </div>
      <!--   时间排序模块   -->
      <div style="margin-top: 20px;">
        <el-col :span="6">
          <strong class="title01">根据时间排序：</strong>
          <el-button @click="getImgs('add_time','asc','',1,10)" size="mini" round icon="el-icon-arrow-down">升序
          </el-button>
          <el-button @click="getImgs('add_time','desc','',1,10)" size="mini" round icon="el-icon-arrow-up">降序
          </el-button>
        </el-col>
        <!--  种类选择的下拉框  -->
        <el-col :span="6" style="display: flex;align-items: center;">
          <strong class="title01">视频种类：</strong>
          <up-load-pop @typeId_first="typeId" @typeId_second="typeId"></up-load-pop>
        </el-col>
        <!--  创建新号数量 输入框  -->
        <el-col :span="6" style="display: flex">
          <el-input style="margin:0 30px;"
                    placeholder="输入视频编号"
                    v-model="input"
                    clearable>
          </el-input>
          <el-button @click="getImgs('','',input)" type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
      </div>
    </el-col>
    <el-col :span="24">
      <video-list :infos="picInfos" :total="count" @remove="removeData" @pageChange="pageChange"></video-list>
    </el-col>
    <!--  弹出框内容  -->
    <el-dialog
        title="上传该视频"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <span>这个视频的类型：</span>
      <!--   下拉框新方法   -->
      <!--      <dialogsPop></dialogsPop>-->
      <up-load-pop @typeId_first="typeId" @typeId_second="typeId"></up-load-pop>
      <el-upload
          class="upload-demo"
          drag
          :action="this.$config_upLoad"
          multiple
          style="margin-top: 10px"
          :on-error="handleAvatarError"
          :on-success="handleAvatarSuccess">
<!--          :before-upload="beforeAvatarUpload">-->
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
        <!--        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过4M</div>-->
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import uploadFile from '../../components/uploadFile'
  import VideoList from "../../components/video/videoList";
  import UpLoadPop from "./pop/upLoadPop";
  import dialogsPop from "./pop/dialogsPop";

  export default {
    name: "index",
    components: {UpLoadPop, VideoList, uploadFile, dialogsPop},
    data() {
      return {
        numsInfo: [{value: '视频数量', key: '5000',},],
        input: '',
        picInfos: [],// 多选框数据
        count: null,
        dialogVisible: false,
        imageUrl: '',
        pic: [],
        type_id: null,
        video_url: '',
      }
    },
    mounted() {
      this.getImgs('', '', '', 1, 10)

      // console.log(this.$config_upLoad)
    },
    methods: {
      async getImgs(order, sort, video_num, page, limit, typecontrol_id) {
        this.$api.material({
            order,
            sort,
            video_num,
            page,
            limit,
            typecontrol_id
          },
          {
            params: {},
          })
          .then((res) => {
            this.picInfos = []
            this.picInfos = res.data.data.list
            console.log(this.picInfos)
            this.count = res.data.data.count
            this.numsInfo[0].key = res.data.data.count
          })
          // .catch((error) => {
          //   this.$message.error('请求错误')
          // })
      },
      async sure() { // 确定按钮
        await this.upLoadAdd()
        await this.getImgs('', '', '', 1, 10)
      },
      async upLoadAdd() {
        console.log(!this.type_id)
        console.log(!this.video_url)
        if (!this.type_id || !this.video_url) {
          this.$confirm('请完成上述操作')
            .then(_ => {
              done();
            })
            .catch(_ => {
            });
        } else {
          this.$api.material_add({
              typecontrol_id: this.type_id,
              video_url: this.video_url,
            },
            {
              params: {},
            }).then((res) => {
            console.log(res)
            this.dialogVisible = false
            this.$router.go(0)
          })
            // .catch((error) => {
            //   this.$message.error('请求错误')
            // })
        }
      },
      typeId(i) {
        this.type_id = i
        console.log(this.type_id)
        this.getImgs()
      },
      // async handleAvatarSuccess(res, file) {
      //   // this.imageUrl = URL.createObjectURL(file.raw);
      //   // console.log(res)\
      //   // this.$confirm('确认关闭？')
      //   if (res.status == 200) {
      //     this.pic.push(res.data)
      //     console.log(this.pic)
      //     // this.video_url =this.pic.toLocaleString()
      //     // console.log(this.video_url)
      //   } else {
      //     this.$confirm(res.msg)
      //       .then(_ => {
      //         done();
      //       })
      //       .catch(_ => {
      //       });
      //   }
      // },
      // beforeAvatarUpload(file) {
      //   const isJPG = file.type.split('/')[0] === 'image';
      //   const isLt2M = file.size / 1024 / 1024 < 2;
      //
      //   if (!isJPG) {
      //     this.$message.error('只能上传图像格式!');
      //   }
      //   if (!isLt2M) {
      //     this.$message.error('上传图像图片大小不能超过 2MB!');
      //   }
      //   return isJPG && isLt2M;
      // },
      handleAvatarError(err, file, fileList){
        console.log(err, file, fileList)
      },
      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        if (res.status == 200) {
          this.pic.push(res.data)
          console.log(this.pic)
          this.video_url = this.pic.toLocaleString()
          console.log(this.video_url)
        } else {
          this.$message.error(res.msg)
            .then(_ => {
              done();
            })
            .catch(_ => {
            });
        }
      },
      beforeAvatarUpload(file) {
        // console.log(file.type.split('/')[0])
        const isVideo = file.type.split('/')[0] === 'video';
        // const isLt600M = file.size / 1024 / 1024 < 600;

        if (!isVideo) {
          this.$message.error('只能上传视频格式!');
        }
        // if (!isLt600M) {
        //   this.$message.error('上传视频文件大小不能超过 600MB!');
        // }
        return isVideo ;
      },
      async removeData(material_ids) {
        this.$api.material_del({
            material_ids,
          },
          {
            params: {},
          }
        )
          .then((res) => {
            console.log(res)
            this.$message.success(res.data.msg)
            // this.getImgs()
            this.$router.go(0)
          })
          .catch((error) => {
            this.$message.error('请求错误')
          })
      },
      async pageChange(pageVal) {
        this.getImgs('', '', '', pageVal, 10)
      },
      visible() {
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
    }
  }
</script>

<style scoped>
  .title01 {
    font-size: 18px;
    margin-right: 10px;
    height: 40px;
    line-height: 40px;
  }
</style>
