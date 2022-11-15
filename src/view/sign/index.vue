<template>
  <div class="">
    <el-col :span="24">
      <h1 class="title">个性签名</h1>
    </el-col>
    <el-col :span="24">
      <!--  上传组件  -->
      <div v-for="(i,index) in numsInfo">
        <upload-file style="justify-content: flex-start;" :value="i.value" :keys="i.key"
                     @dialog="visible"></upload-file>
      </div>
    </el-col>
    <!--  弹出框内容  -->
    <el-dialog
        title="上传个性签名"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose" :on-success="handleAvatarSuccess">
      <span>个性签名的类型：</span>
      <up-load-pop @typeId_first="typeId" @typeId_second="typeId"></up-load-pop>
      <div style="margin-top: 10px;display: flex;
    align-items: center;">
        <span>个性签名的内容：</span>
        <el-input v-model="inputName"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  style="width:217px"></el-input>
      </div>
      <!--      <el-upload-->
      <!--          class="upload-demo" style="margin-top: 10px"-->
      <!--          drag list-type="picture"-->
      <!--          :action="this.$config_upLoad"-->
      <!--          :on-success="handleAvatarSuccess"-->
      <!--          :before-upload="beforeAvatarUpload">-->
      <!--        <i class="el-icon-upload"></i>-->
      <!--        <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>-->
      <!--        &lt;!&ndash;        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过4M</div>&ndash;&gt;-->
      <!--      </el-upload>-->

      <!--      <el-upload-->
      <!--          class="upload-demo" style="margin-top: 10px"-->
      <!--          drag-->
      <!--          :action="this.$config_upLoad"-->
      <!--          :on-success="handleAvatarSuccess02"-->
      <!--          :before-upload="beforeAvatarUpload02">-->
      <!--        <i class="el-icon-upload"></i>-->
      <!--        <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>-->
      <!--        &lt;!&ndash;        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过4M</div>&ndash;&gt;-->
      <!--      </el-upload>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import uploadFile from "../../components/uploadFile/index";
  import UpLoadPop from "../material/pop/upLoadPop";

  export default {
    name: "index",
    components: {uploadFile, UpLoadPop},
    data() {
      return {
        numsInfo: [{value: '个性名称数量', key: '',},],
        input: '',
        picInfos: [],// 多选框数据
        count: null,
        dialogVisible: false,
        imageUrl: '',
        pic: '',
        type_id: null,
        video_url: '',
        nickname: '1',
        inputName: "",
      }
    },
    mounted() {
      this.getImgs(1, 12, '', '', '')
    },
    methods: {
      // 请求总数量
      async getImgs(page, limit, typecontrol_id, status, nickname) {
        this.$api.autograph({
            page,
            limit,
            typecontrol_id,
            status,
            // nickname,
          },
          {
            params: {},
          })
          .then((res) => {
            this.picInfos = []
            // console.log(res)
            this.picInfos = res.data.data.list
            this.count = res.data.data.count
            this.numsInfo[0].key = res.data.data.count
          })
        // .catch((error) => {
        //   this.$message.error('请求错误')
        // })
      },
      typeId(i) {
        this.type_id = i
        console.log(this.type_id)
        this.getImgs(1, 12, this.type_id)
      },
      async handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res)
        if (res.status == 200) {
          this.inputName = res.data
        } else {
          this.$confirm(res.msg)
            .then(_ => {
              done();
            })
            .catch(_ => {
            });
        }

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type.split('/')[0] === 'image';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('只能上传图像格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      visible() {
        this.dialogVisible = true
      },
      handleClose(done) {
        done();
      },
      async sure() { // 确定按钮
        await this.upLoadAdd()
        await this.getImgs('', '', '', 1, 12)
      },
      async upLoadAdd() {
        console.log(!this.inputName)
        console.log(!this.type_id)
        if (!this.inputName || !this.type_id) {
          this.$confirm('请完成上述操作')
            .then(_ => {
              done();
            })
            .catch(_ => {
            });
        } else {
          this.$api.autograph_add({
              autograph: this.inputName,
              typecontrol_id: this.type_id,
            },
            {
              params: {},
            }).then((res) => {
            console.log(res)
            this.dialogVisible = false
            this.getImgs(1, 12, '',)
          })
            .catch((error) => {
              this.$message.error('请求错误')
            })
        }
      },

    },
  }
</script>

<style scoped>

</style>
