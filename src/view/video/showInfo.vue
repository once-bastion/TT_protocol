<template>
  <div class="">
    <el-col :span="24">
      <!--   返回按钮   -->
      <re-back></re-back>

      <!--表格-->
      <el-col :span="24">
        <el-table
            border
            :data="tableData"
            @selection-change="handleSelectionChange"
            style="width: 100%;margin-top:30px">
          <el-table-column
              type="index"
              width="">
          </el-table-column>
          <el-table-column
              prop="release_time"
              label="发布时间">
          </el-table-column>
          <el-table-column
              label="收发状态">
            <template slot-scope="scope">
              {{scope.row.mode == 0?'延时发送':'立即发送'}}
            </template>
          </el-table-column>

          <el-table-column
              prop="task_name"
              label="任务名称">
          </el-table-column>

          <el-table-column
              prop="su_total"
              label="任务总数 / 成功总数 / 失败总数">
            <template slot-scope="scope">
              {{scope.row.total}}
              /
              {{scope.row.su_total}}
              /
              {{scope.row.fail_total}}
            </template>
          </el-table-column>

          <el-table-column
              prop="video_description"
              label="视频描述">
          </el-table-column>

          <el-table-column
              label="操作"
              width="200">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row.videotasks_id)" type="primary" size="small">发布详情</el-button>
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
            :page-size="limit"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange">
        </el-pagination>
      </el-col>
    </el-col>
  </div>
</template>

<script>
  import ReBack from "../../components/reBack/reBack";

  export default {
    name: "showInfo",
    components: {ReBack},
    data() {
      return {
        tableData: [],
        limit: 12,
        total: null,
        page: 1,
      }
    },
    mounted() {
      this.getShow()
    },
    methods: {
      getShow() {
        this.$api.videoTasks({
            page: this.page,
            limit: this.limit,

          },
          {
            params: {},
          })
          .then((res) => {
            this.tableData = []
            this.tableData = res.data.data.list
            console.log(this.tableData)
            this.total = res.data.data.count
          })
      },
      handleSelectionChange(val) {
        this.disabled = !val[0]
        // console.log(val)
        this.deleteData = []
        val.forEach((e, el) => {
          // console.log(e.id)
          this.deleteData.push(e.member_id)
          console.log(this.deleteData)
        })
      },
      // 更改每页条数时触发
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      // 页码改变时触发
      handleCurrentChange(val) {
        this.page = val
        console.log(`当前页: ${val}`);
        this.getShow()
      },
      handleClick(n) {
        console.log(n)
        this.$router.push({path: '/videoTaskDetails', query: {videotasks_id: n}})
      },
    }
  }
</script>

<style scoped>

</style>
