<template>
  <el-col :span="4" class="title01">
    <strong>{{value}}：{{keys}}</strong>
    <el-button type="primary" size="mini" round @click="upLoad">上传</el-button>
  </el-col>
</template>

<script>
  export default {
    name: "index",
    props: ['value', 'keys'],
    mounted() {
    },
    methods: {
      upLoad() {
        this.$emit('dialog',true)
      }
    }
  }
</script>

<style lang="less" scoped>
  .title01 {
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;

    strong {
      margin-right: 20px;
    }
  }
</style>
