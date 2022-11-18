<template>
  <div class="">
    <el-col :span="24">
      <!--  -->
      <h1 class="title">视频发布</h1>
    </el-col>
    <el-col :span="24">
      <div class="title01">选择设备</div>
      <div class="title01_onece">（仅展示当前在线设备和在线账户。先勾选设备再选择账户）</div>
    </el-col>
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
          prop="headimage_id"
          label="设备ID"
          width="180">
      </el-table-column>
      <el-table-column
          prop="password"
          label="设备IP"
          width="190">
      </el-table-column>
      <el-table-column
          prop="typecontrol_id"
          label="设备品牌"
          width="250">
      </el-table-column>
      <el-table-column
          prop="status"
          label="设备状态"
          width="">
        <template slot-scope="scope">
          <!--              {{scope.row.status}}-->
          <statusLight :light="parseInt(scope.row.status)"></statusLight>
        </template>
      </el-table-column>
      <el-table-column
          prop="type_title"
          label="工作时长">
      </el-table-column>

      <!--        <el-table-column-->
      <!--            label="头像"-->
      <!--            width="">-->
      <!--          <template slot-scope="scope">-->
      <!--            <el-image-->
      <!--                style="width: 60px;height: 60px;"-->
      <!--                :src="scope.row.image"-->
      <!--                fit="cover"></el-image>-->
      <!--          </template>-->
      <!--        </el-table-column>-->
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
              <el-table-column
                  label="挂载账户数">
                <template slot-scope="scope">
                </template>
              </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import statusLight from "../../components/statusLight/index";

  export default {
    name: "index",
    components: {
      statusLight,
    },
    data(){
      return{
        tableData:[]
      }
    }
  }
</script>

<style lang="less" scoped>
  .title {
    margin-bottom: 25px;
  }

  .title01 {
    font-size: 15px;
    font-weight: 600;
  }

  .title01_onece {
    color: #aaa;
    font-weight: 700;
  }
</style>
