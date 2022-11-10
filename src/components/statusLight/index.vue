<template>
  <div :class="status"></div>
</template>

<script>
  export default {
    name: "statusLight",
    props: {
      light: Number,
      required: true
    },
    data() {
      return {
        status: ''
      }
    },
    created() {
      if (this.light === 0) {
        this.status = ''
      }
      if (this.light === 1) {
        this.status = 'success'
      }
      if (this.light === 2) {
        this.status = 'warning'
      }
      if (this.light === 3) {
        this.status = 'error'
      }
    },
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

  .success {
    background-color: #70b603;
  }

  .warning {
    background-color: #f59a23;
  }

  .error {
    background-color: #d9001b;
  }
</style>
