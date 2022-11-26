<template>
  <div>
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
            prop=""
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
            prop="nickname"
            label="昵称"
            width="100">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态"
            width="80">
          <template slot-scope="scope">
            <statusLight :light="parseInt(scope.row.status)"></statusLight>
          </template>
        </el-table-column>
        <el-table-column
            label="头像"
            width="100">
          <template slot-scope="scope">
            <el-image
                style="width: 60px;height: 60px;"
                :src="scope.row.avatar_thumb"
                fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column
            prop="number"
            label="粉丝/点赞/播放">
          <template slot-scope="scope">
            <span>{{scope.row.follower_status!==''?scope.row.follower_status:0}} </span>
            <span>/ {{scope.row.following_count!==''?scope.row.follower_status:0}} </span>
            <span>/ {{scope.row.total_favorited!==''?scope.row.follower_status:0}} </span>
          </template>
        </el-table-column>
        <el-table-column
            prop="signature"
            label="签名">
        </el-table-column>
        <el-table-column
            label="视频">
          <template slot-scope="scope">
            <span
                style="font-weight:bold;width:90px;margin-right: 20px;display: inline-block;">总：{{scope.row.video}}条</span>
            <el-button @click="handleClick(scope.row,'video')" type="primary" size="small">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row,'operate')" type="primary" size="small">编辑账户</el-button>
            <el-switch style="margin-left: 20px;"
                       v-model="scope.row.value"
                       active-color="#409eff"
                       inactive-color="#d7d7d7" @change="operation(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        tableData:[   ],
      }
    },
    mounted() {
    },
    methods: {},
  }
</script>

<style scoped>

</style>
