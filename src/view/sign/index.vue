<template>
  <div class="">
    <el-col :span="24">
      <h1 class="title">个性签名</h1>
    </el-col>
    <el-col :span="24">
      <!--  上传组件  -->
      <div v-for="(i,index) in numsInfo">
        <upload-file style="justify-content: flex-start;" :value="i.value" :keys="i.key"
                     @dialog="visible"></upload-file>
      </div>
    </el-col>
    <!--  弹出框内容  -->
    <el-dialog
        title="上传个性签名"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose" :on-success="handleAvatarSuccess">
      <span>个性签名的类型：</span>
      <up-load-pop @typeId_first="typeId" @typeId_second="typeId"></up-load-pop>
      <div style="margin-top: 10px;display: flex;
    align-items: center;">
        <span>个性签名的内容：</span>
        <el-input v-model="inputName"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  style="width:217px"></el-input>
      </div>
      <span style="color: #99a9bf"><strong style="color: red">* </strong> 添加时请用换行分隔开以批量添加</span>

      <!--      <el-upload-->
      <!--          class="upload-demo" style="margin-top: 10px"-->
      <!--          drag list-type="picture"-->
      <!--          :action="this.$config_upLoad"-->
      <!--          :on-success="handleAvatarSuccess"-->
      <!--          :before-upload="beforeAvatarUpload">-->
      <!--        <i class="el-icon-upload"></i>-->
      <!--        <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>-->
      <!--        &lt;!&ndash;        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过4M</div>&ndash;&gt;-->
      <!--      </el-upload>-->

      <!--      <el-upload multiple-->
      <!--          class="upload-demo" style="margin-top: 10px"-->
      <!--          drag-->
      <!--          :action="this.$config_upLoad"-->
      <!--          :on-success="handleAvatarSuccess02"-->
      <!--          :before-upload="beforeAvatarUpload02">-->
      <!--        <i class="el-icon-upload"></i>-->
      <!--        <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>-->
      <!--        &lt;!&ndash;        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过4M</div>&ndash;&gt;-->
      <!--      </el-upload>-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="equipment">
      <!--  标题  -->
      <div class="title01">
        <el-popconfirm title="T﹏T  确定要删除吗" @confirm="deleteFromData">
          <el-button type="primary" slot="reference" :disabled="disabled">删除</el-button></el-popconfirm>
<!--        <el-button type="warning" style="margin-right: 30px;">离线</el-button>-->
<!--        <el-input style="margin:0 30px;"-->
<!--                  placeholder="请输入账户名称或昵称"-->
<!--                  v-model="input"-->
<!--                  clearable>-->
<!--        </el-input>-->
<!--        <el-button type="primary" icon="el-icon-search">搜索</el-button>-->
        <light-btn :colors="btns" @lightByValue="lightByValue"></light-btn>
<!--        <div class="btns all headBtn" @click="lightByValue(0)">-->
<!--          <span>显示全部</span>-->
<!--        </div>-->
        <el-col :span="12" style="padding-left:30px;display: flex;align-items: center;">
          <strong>个性签名种类：</strong>
          <up-load-pop @typeId_first="typeId" @typeId_second="typeId"></up-load-pop>
        </el-col>
      </div>
      <!--表格-->
      <el-col :span="24">
        <el-table
            border
            :data="tableData"
            @selection-change="handleSelectionChange"
            style="width: 100%;margin-top:30px">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              prop="autograph"
              label="签名"
              width="">
          </el-table-column>
          <!--          <el-table-column-->
          <!--              prop="password"-->
          <!--              label="密码"-->
          <!--              width="90">-->
          <!--          </el-table-column>-->
          <el-table-column
              prop="type_title"
              label="种类"
              width="">
          </el-table-column>
          <!--          <el-table-column-->
          <!--              prop="name"-->
          <!--              label="昵称"-->
          <!--              width="100">-->
          <!--          </el-table-column>-->
          <el-table-column
              prop="status"
              label="状态"
              width="">
            <template slot-scope="scope">
              <statusLight :light="parseInt(scope.row.status)"></statusLight>
            </template>
          </el-table-column>
<!--          <el-table-column-->
<!--              label="头像"-->
<!--              width="">-->
<!--            <template slot-scope="scope">-->
<!--              <el-image-->
<!--                  style="width: 60px;height: 60px;"-->
<!--                  :src="scope.row.image"-->
<!--                  fit="cover"></el-image>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <!--          <el-table-column-->
          <!--              prop="number"-->
          <!--              label="粉丝/点赞/播放">-->
          <!--          </el-table-column>-->
          <!--          <el-table-column-->
          <!--              prop="sign"-->
          <!--              label="签名">-->
          <!--          </el-table-column>-->
          <!--          <el-table-column-->
          <!--              label="视频">-->
          <!--            <template slot-scope="scope">-->
          <!--            <span-->
          <!--                style="font-weight:bold;width:90px;margin-right: 20px;display: inline-block;">总：{{scope.row.video}}条</span>-->
          <!--              <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <!--          <el-table-column-->
          <!--              label="操作">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑账户</el-button>-->
          <!--              <el-switch style="margin-left: 20px;"-->
          <!--                         v-model="scope.row.value"-->
          <!--                         active-color="#13ce66"-->
          <!--                         inactive-color="#d7d7d7" @change="operation(scope.row)">-->
          <!--              </el-switch>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
        </el-table>
      </el-col>
      <!--page分页-->
      <el-col :span="24" style="text-align: right;margin-top: 30px">
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="limit"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
      </el-col>
    </div>

  </div>
</template>

<script>
  import uploadFile from "../../components/uploadFile/index";
  import UpLoadPop from "../material/pop/upLoadPop";
  import LightBtn from "../../components/statusLight/lightBtn";
  import statusLight from "../../components/statusLight/index";
  import mountNum from "../../components/mountNum/index";

  export default {
    name: "index",
    components: {
      uploadFile, UpLoadPop, LightBtn,
      statusLight, mountNum,
    },
    data() {
      return {
        numsInfo: [{value: '个性名称数量', key: '',},],
        input: '',
        picInfos: [],// 多选框数据
        count: null,
        dialogVisible: false,
        imageUrl: '',
        pic: '',
        type_id: null,
        video_url: '',
        nickname: '1',
        inputName: "",
        // 下方搜索列表
        inputSearch: '',// 搜索框数据
        equipment: false,
        btns: [
          {status: 1, value: '已用'},
          {status: 2, value: '未用'}],// 1代表绿灯,2代表黄灯,3代表红灯,其余灰色
        tableData: [],
        total: null, //总页数
        multipleSelection: [],

        //表格请求的方式
        page:1,
        limit:100,
        typecontrol_id:'',
        status:'',

        //删除数据
        deleteData:[],

        disabled:true,
      }
    },
    mounted() {
      this.getImgs()
    },
    methods: {
      // 请求总数量
      async getImgs() {
        this.$api.autograph({
            page:this.page,
            limit:this.limit,
            typecontrol_id:this.typecontrol_id,
            status:this.status,
          },
          {
            params: {},
          })
          .then((res) => {
            this.tableData = []
            // console.log(res)
            this.tableData = res.data.data.list
            this.count = res.data.data.count
            this.total = res.data.data.count
            this.numsInfo[0].key = res.data.data.count
          })
        // .catch((error) => {
        //   this.$message.error('请求错误')
        // })
      },
      typeId(i) {
        this.typecontrol_id = i
        console.log(this.type_id)
        this.getImgs()

      },      async handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res)
        if (res.status == 200) {
          this.inputName = res.data
        } else {
          this.$confirm(res.msg)
            .then(_ => {
              done();
            })
            .catch(_ => {
            });
        }

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type.split('/')[0] === 'image';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('只能上传图像格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      visible() {
        this.dialogVisible = true
      },
      handleClose(done) {
        done();
      },
      async sure() { // 确定按钮
        await this.upLoadAdd()
        await this.getImgs()
      },
      async upLoadAdd() {
        console.log(!this.inputName)
        console.log(!this.type_id)
        if (!this.inputName || !this.typecontrol_id) {
          this.$confirm('请完成上述操作')
            .then(_ => {
              done();
            })
            .catch(_ => {
            });
        } else {
          this.$api.autograph_add({
              autograph: this.inputName,
              typecontrol_id: this.typecontrol_id,
            },
            {
              params: {},
            }).then((res) => {
            console.log(res)
            this.dialogVisible = false
            // this.getImgs()
            this.$router.go(0)
          })
            .catch((error) => {
              this.$message.error('请求错误')
            })
        }
      },
      lightByValue(i) {
        // console.log(i.status)
        this.status = i.status
        this.getImgs()
      },
      // 更改每页条数时触发
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      // 页码改变时触发
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page=val
        this.getImgs()
      },
      handleClick(row) {
        console.log(row);
      },
      deleteFromData(row) {
        let autograph_ids = this.deleteData.toLocaleString()
        this.$api.autograph_del({
            autograph_ids,
          },
          {
            params: {},
          })
          .then((res) => {
            console.log(res)
            this.getImgs()
          })
        // .catch((error) => {
        //   this.$message.error('请求错误')
        // })
      },
      handleSelectionChange(val) {
        this.deleteData = []
        this.disabled=!val[0]
        val.forEach((e) => {
          this.deleteData.push(parseInt(e.autograph_id))
          console.log(this.deleteData)
        })
      },
      operation(val) {
        console.log(val)
      },
    },
  }
</script>

<style lang="less" scoped>
  .equipment {
    padding: 70px;

    .title01 {
      margin-top: 10px;
      font-size: 18px;
      display: inline-flex;
      align-items: center;

      span {
        width: 126px;
        margin-right: 10px;
      }
    }

    .all {
      justify-content: center;
      background-color: #d7d7d7;
      width: 100%;
      margin-left: 10px;
      padding: 10px;
      display: flex;
      align-items: center;
      border: 1px solid #7a7a7a;
      border-radius: 10px;

      span {
        text-align: center;
        margin: 0;
      }
    }
  }
</style>
