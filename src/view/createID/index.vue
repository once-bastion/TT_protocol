<template>
  <div>
    <el-col :span="24">
      <h1 class="title">创建新号</h1>
    </el-col>
    <!--  上传组件  -->
    <div v-for="(i,index) in numsInfo">
      <upload-file :value="i.value" :keys="i.key"></upload-file>
    </div>
    <el-col :span="8" style="display: flex;margin-top: 50px;padding-left: 140px;">
      <!--  创建新号数量 输入框  -->
      <el-input style="margin:0 30px;"
                placeholder="请输入账户名称或昵称"
                v-model="input"
                clearable>
      </el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </el-col>
    <el-col :span="24" style="margin-top: 60px;">
      <el-col :span="8">
        <span class="title">账号列表</span>
        <light-btn :colors="colors" @lightByValue="statusBtn"></light-btn>
      </el-col>
      <el-col :span="24" style="margin: 20px 0;">
        <el-button type="primary">启用</el-button>
        <el-button type="danger">禁用</el-button>
      </el-col>

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
<!--          <el-table-column-->
<!--              prop="number"-->
<!--              label="粉丝/点赞/播放">-->
<!--          </el-table-column>-->
          <el-table-column
              prop="sign"
              label="签名">
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
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
      </el-col>

    </el-col>
  </div>
</template>

<script>
  import uploadFile from '../../components/uploadFile'
  import LightBtn from "../../components/statusLight/lightBtn";
  import statusLight from "../../components/statusLight";

  export default {
    name: "index",
    components: {LightBtn, uploadFile, statusLight},
    data() {
      return {
        input: '',
        numsInfo: [
          {value: '头像库数量', key: '400',},
          {value: '昵称库数量', key: '400',},
          {value: '个性签名库数量', key: '400',},
        ],
        colors: [null, 13],
        tableData: [
          {
            username: '10001',
            password: '123456',
            id: 0,
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
            status: 2,
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
        total: 1000,
      }
    },
    methods: {
      statusBtn(i) {
        console.log(i)
      },
      handleSelectionChange(val) {
        console.log(val)
        val.forEach((e, el) => {
          // console.log(e.id)
          console.log(e, el)
        })
      },
      handleClick(row) {
        console.log(row);
      },
      deleteFromData(row) {

      },
      handleSizeChange(){

      },
      handleCurrentChange(){},
    },
  }
</script>

<style lang="less" scoped>
  .title01 {
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
    font-weight: 700;
  }
</style>
