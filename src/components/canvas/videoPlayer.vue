<template>
<div>
  <video width="205" height="368" controls>
    <source :src="src">
    您的浏览器不支持 HTML5 video 标签。
  </video>
</div>
</template>

<script>
  export default {
    name: "videoPlayer",
    props:{
      src:String,
      required: true
    },
    mounted() {
      // console.log(this.src)
    }
  }
</script>

<style scoped>

</style>
