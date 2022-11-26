<template>
  <div>
    <el-radio-group v-model="radio" @input="changeBtn">
      <el-radio :label="2">立即发布</el-radio>
      <el-radio :label="1">
        <div class="block">
          <span class="demonstration">延时发布</span>
          <el-date-picker
              v-model="value2"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
              @change="changeThisData" @focus="radio=1">
          </el-date-picker>
        </div>
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  // 引入公共的bug，来做为中间传达的工具
import Bus from '../../../utils/bus'

export default {
  name: "changeTime",
  data() {
    return {
      radio: '1',
      pickerOptions: {
        shortcuts: [
          // {
          //   text: '今天',
          //   onClick(picker) {
          //     picker.$emit('pick', new Date());
          //   }
          // },

          {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
          {
            text: '后天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 2);
              picker.$emit('pick', date);
            }
          },

        ]
      },
      value2: '',
    }
  },
  mounted() {
  },
  methods: {
    changeBtn(val) {
      // console.log(this.radio)
      // Bus.$emit('mode', val) // 判断立即不立即
      this.$emit('getJust', this.radio) // 判断立即不立即
    },

    changeThisData(val) {
      console.log(this.radio)
      console.log(this.vueTimeChange(this.value2))
      this.$emit('mode', this.radio, this.vueTimeChange(this.value2)) // 判断立即不立即
      this.$emit('getDate', this.radio, this.vueTimeChange(this.value2)) // 判断立即不立即
    }
  }
}
</script>

<style lang="less" scoped>
  /*label:nth-last-child(1){*/
  /*  display: flex;*/
  /*  /deep/.el-radio__input {*/
  /*    display: flex;*/
  /*    align-items: center;*/
  /*  }*/
  /*}*/
  /*.el-radio-group {*/
  /*  display: flex;*/
  /*  font-size: 0;*/
  /*  align-items: center;*/

  /*}*/
</style>
