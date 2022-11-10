<template>
  <div :class="light===false?'':'light'"></div>
</template>

<script>
  export default {
    name: "statusLight",
    props: {
      light: Boolean,
      required: true
    }
  }
</script>

<style lang="less" scoped>
  div {
    width: 20px;
    height: 20px;
    border: 1px solid #7a7a7a;
    background-color: #d7d7d7;
    border-radius: 50%;
    margin: auto;
  }

  .light {
    background-color: #70b603;
  }
</style>
