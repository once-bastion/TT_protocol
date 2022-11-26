<template>
  <div class="scrollable-y">
    <div class="scrollable-x tops">
      <div class="scrollable-y ">
        <h1 class='title01'>上传影片</h1>
        <h1 class="text01">将影片发布至您的账号</h1>
      </div>
    </div>

    <div class="scrollable-x">
      <users-video-list :infos="picInfos" :total="count" @release="changedData" @remove="removeData"
                        @pageChange="pageChange"></users-video-list>
    </div>
    <div class="scrollable-x">
      <div>
      </div>
    </div>
  </div>
</template>

<script>
  // 引入公共的bug，来做为中间传达的工具
  import Bus from '../../../utils/bus'
  import usersVideoList from "./usersVideoList";

  export default {
    name: "usersVideo",
    components: {usersVideoList},
    props: {},
    data() {
      return {
        picInfos: [],// 多选框数据
        count: null,
        mode: 1,
      }
    },
    mounted() {
      this.getImgs('', '', '', 1, 12)
    },
    methods: {
      async pageChange(pageVal) {
        this.getImgs('', '', '', pageVal, 12)
      },
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
            // this.numsInfo[0].key = res.data.data.count
          })
        // .catch((error) => {
        //   this.$message.error('请求错误')
        // })
      },
      async changedData(n, name, v, radio, vaule) {
        console.log(radio)
        if (!radio) {
          this.mode = 1
        }
        if (radio == 1) {
          this.mode = 0
        }

        if (vaule) {
          this.exe_time = vaule
        }
        console.log(n, name, v, this.mode, this.exe_time)
        if (!n||!name||!v||!radio){
          this.$message.warning('请选择或填选完毕')
        }else{
          this.tasks(n, name, v, )
        }

      },
      tasks(video_num, task_name, video_description, uid) {
        this.$api.videoTasks_add({
            video_num,
            task_name,
            video_description,
            uid: this.$route.query.uid,
            mode: this.mode,
            exe_time: this.exe_time,
          },
          {
            params: {},
          })
          .then((res) => {
            console.log(res)
            if (res.status == 200) {
              console.log(res.data)
              this.$message.success(res.data.msg)
              setTimeout(() => {
                this.$router.push('/showInfo')
              }, 1250)
            }
          })
        // .catch((error) => {
        //   this.$message.error('请求错误')
        // })
      },
      async removeData(material_ids) {
        this.$api.material_delZ
      },
    },
  }
</script>

<style lang="less" scoped>
  .scrollable-y {
    .tops {
      width: 80vw;
      justify-content: space-between;

      .tops01 {
        /*width: 57vw;*/
        justify-content: space-evenly;
        align-items: center;
      }
    }

    .title01 {
      font-size: 20px;
      font-weight: bold;
    }

    .text01 {
      color: #8a8b91;
    }

    /deep/ .el-upload-dragger {
      height: auto;

      .el-upload__text {
        margin: 10px;
      }

      .el-upload__text:nth-last-child(3) {
        margin-top: 30px !important;
      }

      .el-upload__text:nth-last-child(1) {
        margin: 30px;
        background-color: #ff0000;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        padding: 10px;
      }
    }
  }
</style>
