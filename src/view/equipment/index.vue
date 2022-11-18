<template>
  <div class="equipment">
    <!--  标题  -->
    <div class="title01">
      <span>{{equipment===false?'只显示在线设备':'显示全部设备'}}</span>
      <el-switch v-model="equipment" @change="equipStatus"></el-switch>
    </div>
    <!--表格-->
    <el-col :span="24">
      <el-table
          :data="tableData" border
          style="width: 100%;margin-top:30px">
        <el-table-column
            prop="id"
            label="设备ID"
            width="170">
        </el-table-column>
        <el-table-column
            prop="ip"
            label="设备IP"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="设备品牌">
        </el-table-column>
        <el-table-column
            prop="status"
            label="设备状态"
            width="170">
          <template slot-scope="scope">
            <statusLight :light="scope.row.status"></statusLight>
          </template>
        </el-table-column>
        <el-table-column
            prop="time"
            label="工作时长">
        </el-table-column>
        <el-table-column
            prop="number"
            label="挂载账户数">
          <template slot-scope="scope">
            <mountNum :num="scope.row.number"></mountNum>
            <el-button @click="handleClick(scope.row)" type="primary" size="small">明细</el-button>
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

  export default {
    name: "index",
    components: {
      statusLight, mountNum,
    },
    data() {
      return {
        equipment: false,
        tableData: [
          {
            id: '10001',
            ip: '120.92.92.88  美国',
            name: '三星 G40',
            status: 1,
            time: '800小时',
            number: ['30', '20', '8', '2'],
          },
          {
            id: '10002',
            ip: '120.92.92.88  美国',
            name: '三星 G40',
            status: 0,
            time: '800小时',
            number: ['30', '0', '30', '0'],
          },
          {
            id: '10003',
            ip: '120.92.92.88  日本',
            name: '三星 G40',
            status: 1,
            time: '800小时',
            number: ['30', '0', '30', '0'],
          },
          {
            id: '10004',
            ip: '120.92.92.88  中国',
            name: '三星 G40',
            status: 1,
            time: '800小时',
            number: ['30', '0', '30', '0'],
          },
          {
            id: '10005',
            ip: '120.92.92.88  越南',
            name: '三星 G40',
            status: 1,
            time: '800小时',
            number: ['30', '0', '30', '0'],
          },
          {
            id: '10005',
            ip: '120.92.92.88  巴西',
            name: 'HUAWEI P 50',
            status: 1,
            time: '800小时',
            number: ['30', '0', '30', '0'],
          },
        ],
        total: 1000 //总页数
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
      equipStatus() {
        if (this.equipment === true) {
        } else {
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .equipment {
    padding: 70px;

    .title01 {
      font-size: 18px;
      background-color: #fff;
      display: inline-flex;
      align-items: center;
      padding: 10px;
      border-radius: 10px;
      border: 1px solid #e5e9f2;

      span {
        width: 126px;
        margin-right: 10px;
      }
    }

  }
</style>
