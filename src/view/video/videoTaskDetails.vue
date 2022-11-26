<template>
  <div>
    <re-back></re-back>
    <light-btn :colors="btns" @lightByValue="lightByValue"></light-btn>
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
            label="收发状态">
          <template slot-scope="scope">
            {{scope.row.mode == 0?'延时发送':'立即发送'}}
          </template>
        </el-table-column>
        <el-table-column
            prop="exe_time"
            label="执行时间">
        </el-table-column>
        <el-table-column
            prop="pay_time"
            label="上传时间">
        </el-table-column>
        <el-table-column
            prop="task_name"
            label="任务名称">
        </el-table-column>
        <el-table-column
            prop="texts"
            label="视频描述">
        </el-table-column>
        <el-table-column
            prop="uid"
            label="uid">
        </el-table-column>
        <el-table-column
            prop="su_total"
            label="视频"
            width="300">
          <template slot-scope="scope">
            <video-player :src="scope.row.video_num"></video-player>
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
            prop="failure_reason"
            label="失败原因">
        </el-table-column>
        <!--        <el-table-column-->
        <!--            label="操作"-->
        <!--            width="200">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button @click="handleClick(scope.row.videotasks_id)" type="primary" size="small">发布详情</el-button>-->
        <!--            &lt;!&ndash;            <el-switch style="margin-left: 20px;"&ndash;&gt;-->
        <!--            &lt;!&ndash;                       v-model="scope.row.value"&ndash;&gt;-->
        <!--            &lt;!&ndash;                       active-color="#409eff"&ndash;&gt;-->
        <!--            &lt;!&ndash;                       inactive-color="#d7d7d7" @change="operation(scope.row)">&ndash;&gt;-->
        <!--            &lt;!&ndash;            </el-switch>&ndash;&gt;-->
        <!--          </template>-->
        <!--        </el-table-column>-->
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
</template>

<script>
  import ReBack from "../../components/reBack/reBack";
  import StatusLight from "../../components/statusLight/index";
  import LightBtn from "../../components/statusLight/lightBtn";
  import VideoPlayer from "../../components/canvas/videoPlayer";

  export default {
    name: "videoTaskDetails",
    components: {VideoPlayer, LightBtn, StatusLight, ReBack},
    data() {
      return {
        limit: 12,
        total: null,
        page: 1,

        tableData: [],
        btns: [
          {status: 1, value: '未开始'},
          {status: 2, value: '成功'},
          {status: 3, value: '失败'},],// 1代表绿灯,2代表黄灯,3代表红灯,其余灰色

        status: '',
      }
    },
    mounted() {
      this.getDetails()
    },
    methods: {
      getDetails() {
        this.$api.videoTaskDetails({
            videotasks_id: this.$route.query.videotasks_id,
            status: this.$route.query.status,
          },
          {
            params: {},
          })
          .then((res) => {
            this.tableData = []
            console.log(res.data.data)
            this.tableData = res.data.data.list
            res.data.data.list.forEach((e, index) => {
              if (e.status === '0') {
                console.log(e.status)
                this.tableData[index].status = 3
              }
            })
          })
        // .catch((error) => {
        //   this.$message.error('请求错误')
        // })
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
      async lightByValue(i) {
        if (i.status === 3) {
          var status = 0
        } else {
          var status = i.status
        }
        // console.log(this.status)
        await this.$router.push({
          path: '/videoTaskDetails',
          query: {
            videotasks_id: this.$route.query.videotasks_id,
            status,
          }
        })
        setTimeout(() => {
          this.$router.go(0)
        }, 10)
      },
    }
  }
</script>

<style scoped>

</style>
