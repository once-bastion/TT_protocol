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
      this.showLight()
    },
    methods: {
      showLight() {
        let shine = this.light
        // console.log(shine)
        if (shine == null) {
          this.status = 'disabled'
        }
        if (shine == 0 || shine == 1) {
          this.status = ''
          // debugger
        }
        if (shine == 2) {
          this.status = 'success'
        }
        if (shine == 3 || shine == 13) {
          this.status = 'error'
        }
        if (shine == 4) {
          this.status = 'warning'
        }
      }
    },
    watch: {
      light(newVal, oldVal) {
        console.log(newVal)
        if (newVal != null) {
          this.status = newVal
          // debugger
          this.showLight()
        }
        // this.lists = []
        // newVal.forEach((e, index) => {
        //   this.lists[index] = e.material_id
        // })
      },
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

  .disabled {
    background-color: #7f7f7f;
  }
</style>
