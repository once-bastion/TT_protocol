<template>
  <div class="scrollable-x">
    <div class="btns headBtn" v-for="(i,index) in colors" @click="btnData(i)">
      <status-light :light="i.status"></status-light>
<!--      <span v-if="i===1">仅显示在线</span>-->
<!--      <span v-if="i===2">仅显示离线</span>-->
<!--      <span v-if="i===3">仅显示异常</span>-->
<!--      <span v-if="i===null">未启用</span>-->
<!--      <span v-if="i===13">已禁用</span>-->
      <span>{{i.value}}</span>
    </div>

  </div>

</template>

<script>
  import StatusLight from "./index";

  export default {
    name: "lightBtn",
    components: {StatusLight},
    props: {
      colors: Array,
      required: true
    },
    data() {
      return {}
    },
    mounted() {
      console.log(this.colors)
    },
    methods: {
      btnData(i) {
        this.$emit('lightByValue', i)
      }
    }
  }
</script>

<style lang="less" scoped>
  .btns {
    width: 100%;
    margin-left: 10px;
    background-color: #fff;
    padding: 10px;
    display: flex;
    align-items: center;
    border: 1px solid #7a7a7a;
    border-radius: 10px;

    div {
      display: inline-block;
    }

    span {
      width: 100px;
      margin-left: 10px;
    }
  }


</style>
