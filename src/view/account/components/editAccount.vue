<template>
  <div>
    <div class="inputs">
      <span>昵称：</span>
      <el-input v-model="nike_name" clearable></el-input>
      <el-button :icon="icon1" type="primary" style="margin-left: 10px;" @click="save(1)">修改</el-button>
    </div>
    <!--    <div class="inputs">-->
    <!--      <span>密码：</span>-->
    <!--      <el-input v-model="password" clearable></el-input>-->
    <!--    </div>-->

    <div class="inputs">
      <span>签名：</span>
      <el-input v-model="signature" clearable></el-input>
      <el-button :icon="icon2" type="primary" style="margin-left: 10px;" @click="save(2)">修改</el-button>
    </div>

    <div class="inputs">
      <span>头像：</span>
      <el-upload
          class="upload-demo"
          drag
          :action="this.$config_upLoad"
          :before-close="handleClose" :on-success="handleAvatarSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将图片文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

    </div>
    <div class="saveData">
      <el-button type="primary" @click="save(3)" :icon="icon3">头像修改</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "editAccount",
    props: {
      member_id: String,
      nikeName: String,
      required: true
    },
    data() {
      return {
        nike_name: '',
        password: '',
        signature: '',

        pic: '',
        icon1: 'el-icon-edit',
        icon2: 'el-icon-edit',
        icon3: 'el-icon-edit',
      }
    },
    mounted() {
    },
    methods: {
      handleClose() {

      },
      handleAvatarSuccess(res, file) {
        this.pic = res.data
        console.log(this.pic)
      },
      save(type) {
        // if (!this.nike_name) {
        //   this.$confirm('请完成上述操作')
        // } else {
        if (type === 1) {
          if (!this.nike_name) {
            this.$confirm('请完成上述操作')
          } else {
            this.icon1 = 'el-icon-loading'
            this.updateData01(type)
          }
        }
        if (type === 2) {
          if (!this.signature) {
            this.$confirm('请完成上述操作')
          } else {
            this.icon2 = 'el-icon-loading'
            this.updateData02(type)
          }
        }
        if (type === 3) {
          if (!this.pic) {
            this.$confirm('请完成上述操作')
          } else {
            this.icon3 = 'el-icon-loading'
          this.updateData03(type)
          }
        }
      },
      updateData01(type) {
        this.$api.memberUpdate({
            type,
            nickname: this.nike_name,
            member_id: this.member_id,
          },
          {
            params: {},
          })
          .then((res) => {
            // this.$message.success('修改成功')
            this.icon1 = 'el-icon-edit'
          })
        // .catch((error) => {
        //   this.$message.error('请求错误')
        // })
      },
      updateData02(type) {
        this.$api.memberUpdate({
            type,
            // nickname: this.nike_name,
            signature: this.signature,
            member_id: this.member_id,
          },
          {
            params: {},
          })
          .then((res) => {
            // this.$message.success('修改成功')
            this.icon2 = 'el-icon-edit'
          })
        // .catch((error) => {
        //   this.$message.error('请求错误')
        // })
      },
      updateData03(type) {
        this.icon = 'el-icon-loading'
        this.$api.memberUpdate({
            type,
            // nickname: this.nike_name,
            avatar_thumb: this.pic,
            member_id: this.member_id,
          },
          {
            params: {},
          })
          .then((res) => {
            // this.$message.success('修改成功')
            this.icon3 = 'el-icon-check'
            setTimeout(() => {
              this.icon3 = 'el-icon-edit'
            }, 2000)
          })
          .catch((error) => {
            this.$message.error('请求错误')
          })
      },
    },
    watch: {
      member_id(n, o) {
        // if (n) {
        console.log(n, o)
        console.log(this.nikeName)
        // this.nike_name = ''
        // this.password = ''
        // this.signature = ''
        // }
      },
      nikeName(n, o) {
        console.log(n, o)
      }
    }
  }
</script>

<style lang="less" scoped>
  .inputs, .saveData {
    display: flex;
    align-items: center;
    width: 57%;
    margin: 0 auto 10px;

    span {
      width: 70px;
    }
  }

  .upload-demo {
    margin: auto;
  }

  .el-upload__tip {
    text-align: center;
  }

  .saveData {
    justify-content: center;
    margin: 40px auto 0;
  }
</style>
