<template>
  <div class="equipment">
    <!--  标题  -->
    <div class="title">
      <el-button type="primary" @click="deleteFromData">删除</el-button>
      <el-button type="warning" style="margin-right: 30px;">离线</el-button>
      <el-input style="margin:0 30px;"
                placeholder="请输入内容"
                v-model="input"
                clearable>
      </el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>


    </div>
    <!--表格-->
    <el-col :span="24">
      <el-table
          border
          :data="tableData" @selection-change="handleSelectionChange"
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
            prop="id"
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
            <img style="width: 50px;" :src="scope.row.head" alt="">
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
  </div>
</template>

<script>
  import statusLight from "../../components/statusLight";
  import mountNum from "../../components/mountNum";

  export default {
    name: "index",
    components: {
      statusLight, mountNum,
    },
    data() {
      return {
        input: '',
        equipment: false,
        tableData: [
          {
            username: '10001',
            password: '123456',
            id: '10001',
            name: 'dfsghsd',
            status: 1,
            head: 'https://i02piccdn.sogoucdn.com/82f1b297ad5dcd48',
            number: '90/90/90',
            sign: '2333333',
            video: '300'
          }, {
            username: '10001',
            password: '123456',
            id: '10001',
            name: 'dfsghsd',
            status: 2,
            head: 'https://pic1.zhimg.com/v2-6714b4912885f481d11776147a672fe0_b.jpg',
            number: '90/90/90',
            sign: '2333333',
            video: '300'
          }, {
            username: '10001',
            password: '123456',
            id: '10001',
            name: 'dfsghsd',
            status: 1,
            head: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG3Ohe8XLVo4rh8evm8QTHYRUCm7ZqBiR6Y4SJlcw&s',
            number: '90/90/90',
            sign: '2333333',
            video: '300'
          }, {
            username: '10001',
            password: '123456',
            id: '10001',
            name: 'dfsghsd',
            status: 1,
            head: 'https://gw.alicdn.com/i4/710600684/O1CN01BSkFT41GvJe0mLJBv_!!710600684.jpg_Q75.jpg_.webp',
            number: '90/90/90',
            sign: '2333333',
            video: '300'
          }, {
            username: '10001',
            password: '123456',
            id: '10001',
            name: 'dfsghsd',
            status: 3,
            head: 'https://i02piccdn.sogoucdn.com/b7aab9d95658a1af',
            number: '90/90/90',
            sign: '2333333',
            video: '300'
          }, {
            username: '10001',
            password: '123456',
            id: '10001',
            name: 'dfsghsd',
            status: 1,
            head: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE4GSgSokloDWq91MkkecsXaW5mSmeIjuH7D3D53JpjA&s',
            number: '90/90/90',
            sign: '2333333',
            video: '300'
          },

        ],
        total: 1000, //总页数
        multipleSelection: [],
      }
    },
    mounted() {
    },
    methods: {
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
        this.multipleSelection = val;
      }
    },
  }
</script>

<style lang="less" scoped>
  .equipment {
    padding: 70px;

    .title {
      font-size: 18px;
      display: inline-flex;
      align-items: center;

      span {
        width: 126px;
        margin-right: 10px;
      }
    }

  }
</style>
