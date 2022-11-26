<template>
  <el-tooltip class="item headBtn" effect="dark" content="返回至上一级" placement="right">
    <i style="font-size: 22px;" class="el-icon-back" @click="back()"></i>
  </el-tooltip>
</template>

<script>
  export default {
    name: "reBack",
    methods: {
      back() {
        // window.location.go(-1)
        this.$router.back()
        setTimeout(() => {
          location.reload()
        }, 10)
      }
    }
  }
</script>

<style scoped>

</style>
