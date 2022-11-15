<template>
  <up-load-pop @typeId_first="typeId" @typeId_second="typeId"></up-load-pop>
</template>

<script>
  export default {
    name: "dialogsPop",
    data(){
      return{
        pic: '',
        type_id: null,
        video_url: '',
      }
    },
    typeId(i) {
      this.type_id = i
      console.log(this.type_id)
      this.getImgs('', '', '', 1, 12, this.type_id)
    },
  }
</script>

<style scoped>

</style>
