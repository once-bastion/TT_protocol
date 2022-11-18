<template>
  <div class="equipment">
    <!--  标题  -->
    <div class="title01">
      <el-button type="primary" @click="deleteFromData">删除</el-button>
      <el-button type="warning" style="margin-right: 30px;">离线</el-button>
      <el-input style="margin:0 30px;"
                placeholder="请输入账户名称或昵称"
                v-model="input"
                clearable>
      </el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
            prop="username"
            label="账号"
            width="90">
        </el-table-column>
        <el-table-column
            prop="password"
            label="密码"
            width="90">
        </el-table-column>
        <el-table-column
            prop="equipmentID"
            label="设备ID"
            width="100">
        </el-table-column>
        <el-table-column
            prop="name"
            label="昵称"
            width="100">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态"
            width="80">
          <template slot-scope="scope">
            <statusLight :light="scope.row.status"></statusLight>
          </template>
        </el-table-column>
        <el-table-column
            label="头像"
            width="100">
          <template slot-scope="scope">
            <el-image
                style="width: 60px;height: 60px;"
                :src="scope.row.head"
                fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column
            prop="number"
            label="粉丝/点赞/播放">
        </el-table-column>
        <el-table-column
            prop="sign"
            label="签名">
        </el-table-column>
        <el-table-column
            label="视频">
          <template slot-scope="scope">
            <span
                style="font-weight:bold;width:90px;margin-right: 20px;display: inline-block;">总：{{scope.row.video}}条</span>
            <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑账户</el-button>
            <el-switch style="margin-left: 20px;"
                       v-model="scope.row.value"
                       active-color="#13ce66"
                       inactive-color="#d7d7d7" @change="operation(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <!--page分页-->
    <el-col :span="24" style="text-align: right;margin-top: 30px">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="12"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
  import statusLight from "../../components/statusLight";
  import mountNum from "../../components/mountNum";
  import LightBtn from "../../components/statusLight/lightBtn";

  export default {
    name: "index",
    components: {
      LightBtn,
      statusLight, mountNum,
    },
    data() {
      return {
        input: '',// 搜索框数据
        equipment: false,
        btns: [
          {status: 1, value: '仅显示在线'},
          {status: 4, value: '仅显示离线'},
          {status: 3, value: '仅显示异常'},
        ],// 1代表绿灯,2代表黄灯,3代表红灯,其余灰色

        tableData: [
          {
            username: '10001',
            password: '123456',
            id: 0,
            equipmentID: '10001',
            name: 'dfsghsd',
            status: 1,
            head: 'https://i02piccdn.sogoucdn.com/82f1b297ad5dcd48',
            number: '90/90/90',
            sign: '2333333',
            video: '300',
            value: true,
          },
          {
            username: '10001',
            password: '123456',
            id: 1,
            equipmentID: '10002',
            name: 'dfsghsd',
            status: 4,
            head: 'http://img.duoziwang.com/2018/20/07211700202853.jpg',
            number: '90/90/90',
            sign: '2333333',
            video: '300',
            value: true,
          },
          {
            username: '10001',
            password: '123456',
            id: 2,
            equipmentID: '10003',
            name: 'dfsghsd',
            status: 1,
            head: 'https://cdnimg.gamekee.com/images/touhoulostword/1590626787410_14115288.png',
            number: '90/90/90',
            sign: '2333333',
            video: '300',
            value: true,
          },
          {
            username: '10004',
            password: '123456',
            id: 3,
            equipmentID: '10001',
            name: 'dfsghsd',
            status: 1,
            head: 'https://inews.gtimg.com/newsapp_bt/0/13094567333/641',
            number: '90/90/90',
            sign: '2333333',
            video: '300',
            value: true,
          },
          {
            username: '10005',
            password: '123456',
            id: 4,
            equipmentID: '10001',
            name: 'dfsghsd',
            status: 3,
            head: 'https://i02piccdn.sogoucdn.com/b7aab9d95658a1af',
            number: '90/90/90',
            sign: '2333333',
            video: '300',
            value: true,
          },
          {
            username: '10006',
            password: '123456',
            id: 5,
            equipmentID: '10001',
            name: 'dfsghsd',
            status: 1,
            head: 'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2022%2F0513%2F38b56e80j00rbsuc5006tc001jk013zm.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
            number: '90/90/90',
            sign: '2333333',
            video: '300',
            value: true,
          },
        ],
        total: 1000, //总页数
        multipleSelection: [],
      }
    },
    mounted() {
    },
    methods: {
      lightByValue(i) {
        console.log(i.status)
        this.nickName(1, 5, i.status)
      },
      // 更改每页条数时触发
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      // 页码改变时触发
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClick(row) {
        console.log(row);
      },
      deleteFromData(row) {
      },
      handleSelectionChange(val) {
        console.log(val)
        val.forEach((e, el) => {
          // console.log(e.id)
          console.log(e, el)
        })
      },
      operation(val) {
        console.log(val)
      }
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
