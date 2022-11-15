<template>
  <el-cascader v-model="valueData" :options="options" @expand-change="changeFrom" @change="getChecked">
    <template slot-scope="{ node, data }">
      <span>{{ data.label }}</span>
      <!--      <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>-->
    </template>
  </el-cascader>
</template>

<script>
  let id = 0;
  export default {
    name: "upLoadPop",
    data() {
      return {
        options: [],
        valueData: '',
      };
    },
    mounted() {
      this.getType(0)
    },
    methods: {
      changeFrom(val) {
        this.getType(parseInt(val[0]))
      },
      async getType(pid) {
        this.$api.typecontrol({
            pid,
          },
          {
            params: {},
          })
          .then((res) => {
            if (pid === 0) {
              res.data.data.list.forEach((e, index) => {
                // console.log(e)
                let label = e.label
                let value = e.value
                let children = []
                this.options.push({value, label, children})
              })
              console.log(this.options)
            } else {
              this.options.forEach((e, index) => {
                // console.log(e.value)
                if (pid === parseInt(e.value)) {
                  let key = 'children'
                  let value = res.data.data.list
                  this.options[index][key] = value
                }
              })
              console.log(this.options)
            }
          })
          .catch((error) => {
            this.$message.error('请求错误')
          })
      },
      getChecked() {
        let i = this.valueData
        let n = parseInt(i[i.length - 1])
        this.$emit('typeId', n)
      },
    },
  }
</script>

<style scoped>

</style>
