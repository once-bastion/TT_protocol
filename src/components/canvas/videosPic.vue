<template>
  <div>
    <el-form>
      <el-form-item ref="videocontentvideo" style="">
        <img :src="imgurl">
        <video width="320" height="240" controls id="upvideo">
        </video>
        <video width="207" height="368" controls>
          <source src="https://oss.judianseo.com/img/564.mp4" type="video/mp4">
          您的浏览器不支持 HTML5 video 标签。
        </video>
        <img :src="modlevidel"/>
      </el-form-item>

      <el-form-item class="upload-demo-content" v-show="formLabelAlign.type==2">
        <el-upload class="upload-demo" :on-exceed="exceedhandle" drag multiple :file-list="filsListArray"
                   :action="this.$config_upLoad" :on-success="successuploadhandle" accept="video" name="fileList"
                   :before-upload="beforeUploadVideo">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将视频文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip"></div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: "videosPic",
    data() {
      return {
        imgurl: '',
        modlevidel: '',
        formLabelAlign: {type: 2, video: ''},
        filsListArray: [{url: 'http://192.168.4.30/uploads/admin/202211/637218fd0cd7a.mp4'}],
        configuploadurl: 'https://jsonplaceholder.typicode.com/posts/',
      }
    },
    mounted() {
      // this.showvideohandle()
    },
    methods: {
      successuploadhandle(response, file, fileList) {
        this.formLabelAlign.video = this.modlevidel =
          response.data.fileList[0].url;
        debugger
        this.filsListArray = [];
        this.filsListArray.push({
          name: this.formLabelAlign.video,
          url: this.formLabelAlign.video
        });
        this.findvideocover();
      },
      exceedhandle(files, fileList) {
        this.$message.error("只能上传一个视频额");
      },
      beforeUploadVideo(file) {
        if (
          [
            "video/mp4",
            "video/ogg",
            "video/flv",
            "video/avi",
            "video/wmv",
            "video/rmvb"
          ].indexOf(file.type) == -1
        ) {
          this.$message.error("请上传正确的视频格式");
          return false;
        }
      },
      findvideocover() {
        let _this = this;
        this.$nextTick(() => {
          let video = document.getElementById("upvideo");
          let source = document.createElement("source");
          // source.src = require("../../assets/5b086751dbb7af1ea8fa8d05e66fe5c3.mp4");this.formLabelAlign.video
          source.src = this.formLabelAlign.video;
          source.type = "video/mp4";
          video.appendChild(source);
          video.addEventListener("loadeddata", function () {
            var canvas = document.createElement("canvas");
            canvas.width = "320";
            canvas.height = "320";
            canvas
              .getContext("2d")
              .drawImage(video, 0, 0, canvas.width, canvas.width);
            var img = document.createElement("img");
            let imgsrc = canvas.toDataURL("image/png");
            console.log(imgsrc)
            _this.Videoframehandle(imgsrc.split(",")[1]);
          });
        });
      },
      // 视频预览
      showvideohandle() {
        this.$alert(
          `<video width="320" height="240" controls>
                      <source src="${
            this.filsListArray[0].url
          }"  type="video/mp4">
                      您的浏览器不支持 HTML5 video 标签。
                    </video>`,
          "视频预览",
          {
            dangerouslyUseHTMLString: true
          }
        );
      },
      Videoframehandle(fileobject) {
        console.log(fileobject)
        // let filearray = {
        //   fileName: "video.jpg",
        //   content: fileobject
        // };
        // this.$axios
        //   .post(HttpUrl.uploadBase64, filearray)
        //   .then(res => {
        //     if (res.data.code != "0") {
        //       this.$message.error(res.data.msg);
        //       return;
        //     }
        //     this.imgcover = res.data.data.fileList[0].url;
        //   })
        //   .catch(function(error) {
        //     alert("服务器出小差啦~~");
        //   });
      },

    },
  }
</script>

<style scoped>

</style>
