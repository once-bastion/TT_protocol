<!--用户上传视频 一次一个-->
<template>
  <div class="equipment">
    <!--  弹框组件  -->
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="30%" center
        :before-close="handleClose">
      <span>这个视频的类型：</span>
      <!--   下拉框新方法   -->
      <up-load-pop @typeId_first="typeId" @typeId_second="typeId"></up-load-pop>
      <!--   视频单选区域   -->
      <video-radio></video-radio>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure()">确 定</el-button>
      </span>
    </el-dialog>
    <!--  标题  -->
    <div class="title01">
      <el-popconfirm title="T﹏T  确定要删除吗" @confirm="deleteFromData">
        <el-button type="primary" slot="reference" :disabled="disabled">删除</el-button>
      </el-popconfirm>
      <!--      <el-button type="warning" style="margin-right: 30px;">离线</el-button>-->
      <el-input style="margin:0 30px;"
                placeholder="请输入账户名称或昵称"
                v-model="input"
                clearable>
      </el-input>
      <el-button @click="search()" type="primary" icon="el-icon-search">搜索</el-button>
      <light-btn :colors="btns" @lightByValue="lightByValue"></light-btn>
      <div class="btns all headBtn" @click="lightByValue(0)">
        <span>显示全部</span>
      </div>
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
            prop="uid"
            label="唯一ID"
            width="">
        </el-table-column>
        <!--        <el-table-column-->
        <!--            prop="uid"-->
        <!--            label="账号"-->
        <!--            width="190">-->
        <!--        </el-table-column>-->
        <!--        <el-table-column-->
        <!--            prop="password"-->
        <!--            label="密码"-->
        <!--            width="90">-->
        <!--        </el-table-column>-->
        <!--        <el-table-column-->
        <!--            prop="equipmentID"-->
        <!--            label="设备ID"-->
        <!--            width="100">-->
        <!--        </el-table-column>-->
        <el-table-column
            prop="nickname"
            label="昵称">
          <template slot-scope="scope">
            <el-link type="info" @click="toLink(scope.row.unique_id)">{{scope.row.nickname}}</el-link>
          </template>
        </el-table-column>
        <el-table-column
            prop="country"
            label="国家"
            width="80">
        </el-table-column>
        <el-table-column
            prop="member_type"
            label="单位"
            width="100">
          <template slot-scope="scope">
            {{ scope.row.member_type === '0'?'个人账号':''}}
            {{ scope.row.member_type === '1'?'创作者账号':''}}
            {{ scope.row.member_type === '2'?'企业':''}}
          </template>
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态"
            width="70">
          <template slot-scope="scope">
            <statusLight :light="parseInt(scope.row.status)"></statusLight>
          </template>
        </el-table-column>
        <el-table-column
            label="头像"
            width="100">
          <template slot-scope="scope">
            <el-image
                style="width: 50px;height: 50px;"
                :src="scope.row.avatar_thumb"
                fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column
            prop="number"
            label="关注/粉丝/获赞">
          <template slot-scope="scope">
            <el-link @click="$router.push({ path: '/focus', query: { member_id: scope.row.member_id } })">
              {{scope.row.following_count}}
            </el-link>
            /
            <el-link @click="$router.push({ path: '/fans', query: { member_id: scope.row.member_id } })">
              {{scope.row.follower_status}}
            </el-link>
            /
            <el-link @click="$router.push({ path: '/focus', query: { member_id: scope.row.member_id } })">
              {{scope.row.total_favorited}}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column
            prop="signature"
            label="签名">
        </el-table-column>
        <el-table-column
            label="视频"
            width="">
          <template slot-scope="scope">
            <span
                style="font-weight:bold;width:90px;margin-right: 20px ;display: inline-block;">总：{{scope.row.video_count}}条</span>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row,'operate')" type="primary" size="small">上传视频</el-button>
            <!--            <el-switch style="margin-left: 20px;"-->
            <!--                       v-model="scope.row.value"-->
            <!--                       active-color="#409eff"-->
            <!--                       inactive-color="#d7d7d7" @change="operation(scope.row)">-->
            <!--            </el-switch>-->
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <!--page分页-->
    <el-col :span="24" style="text-align: right;margin-top: 30px">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
  import statusLight from "../../components/statusLight";
  import LightBtn from "../../components/statusLight/lightBtn";
  import mountNum from "../../components/mountNum/index";
  import UpLoadPop from "../material/pop/upLoadPop";
  import VideoRadio from "./videoRadio";

  export default {
    name: "index",
    components: {
      VideoRadio,
      UpLoadPop,
      LightBtn,
      statusLight,
      mountNum,
    },
    data() {
      return {
        input: '',// 搜索框数据
        equipment: false,

        memberId: '',
        nikeName: '',

        btns: [
          {status: 2, value: '仅显示在线'},
          {status: 4, value: '仅显示离线'},
          {status: 3, value: '仅显示异常'},
        ],// 1代表绿灯,2代表黄灯,3代表红灯,其余灰色

        tableData: [],
        pageSize: 12,
        total: null, //总页数
        multipleSelection: [],

        title: '',
        dialogVisible: false,

        //删除的数据
        deleteData: [],
        disabled: true,
        disabled01: false,
      }
    },
    mounted() {
      this.getMember()
    },
    methods: {
      getMember() {
        this.$api.member({},
          {
            params: {},
          })
          .then((res) => {
            this.tableData = []
            // console.log(res)
            this.tableData = res.data.data.list
            res.data.data.list.forEach((e, index) => {
              // console.log(e.status)
              if (e.status === '1') {
                this.tableData[index].status = 2
              }
              if (e.status === '2') {
                this.tableData[index].status = 1
              }

            })
            this.total = res.data.data.count
          })
      },
      typeId(i) {
        this.type_id = i
        console.log(this.type_id)
        this.getImgs()
      },
      handleClose() {
        this.dialogVisible = false
      },
      handleSizeChange() {
      },
      handleCurrentChange() {
      },
      handleClick() {
        this.dialogVisible = true
      },
      deleteFromData() {
      },
      handleSelectionChange() {
      },
      lightByValue(i) {
        console.log(i.status)
        this.nickName(1, 5, i.status)
      },
      //  上传视频
      handleAvatarError(err, file, fileList) {
        console.log(err, file, fileList)
      },
      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        if (res.status == 200) {
          this.pic.push(res.data)
          console.log(this.pic)
          this.video_url = this.pic.toLocaleString()
          console.log(this.video_url)
        } else {
          this.$message.error(res.msg)
            .then(_ => {
              done();
            })
            .catch(_ => {
            });
        }
      },
      beforeAvatarUpload(file) {
        // console.log(file.type.split('/')[0])
        const isVideo = file.type.split('/')[0] === 'video';
        // const isLt600M = file.size / 1024 / 1024 < 600;

        if (!isVideo) {
          this.$message.error('只能上传视频格式!');
        }
        // if (!isLt600M) {
        //   this.$message.error('上传视频文件大小不能超过 600MB!');
        // }
        return isVideo;
      },
    },
  }
</script>

<style lang="less" scoped>
  .equipment {
    padding: 70px;

    .title01 {
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
