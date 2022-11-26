<template>
  <div>
    <div v-for="(i,index) in list">
      <el-radio v-model="radio" label="1">备选项</el-radio>
      <video-player src="http://192.168.4.30/uploads/api/202211/637f5997025f9.mp4"></video-player>
    </div>
  </div>
</template>

<script>
  import VideoPlayer from "../../components/canvas/videoPlayer";

  export default {
    name: "videoRadio",
    components: {VideoPlayer},
    data: function () {
      return {
        radio:'1',
        list: [
          {url:'http://192.168.4.30/uploads/api/202211/637f5997025f9.mp4'},
        ],
      }
    },
  }
</script>

<style scoped>

</style>
