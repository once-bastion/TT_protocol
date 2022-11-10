<template>
  <strong>
    <span style="margin-right: 10px;color: #555">总:{{num[0]}}</span>
    <span style="margin-right: 10px;color: #70b603">正常:{{num[1]}}</span>
    <span style="margin-right: 10px;color: #f59a23">离线:{{num[2]}}</span>
    <span style="margin-right: 10px;color: #d9001b">异常:{{num[3]}}</span>
  </strong>
</template>

<script>
  export default {
    name: "mountNum",
    props: {
      num: Array,
      required: true,
    },
    mounted() {
      // console.log(this.num)
    }
  }
</script>

<style scoped>
  strong {
    margin-right: 10px;
  }
</style>
