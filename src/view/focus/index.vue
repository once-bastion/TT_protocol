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
            prop="member_id"
            label="用户ID"
            width="100">
        </el-table-column>
        <el-table-column
            prop="create_time"
            label="关注的时间"
            width="150">
        </el-table-column>
<!--        <el-table-column-->
<!--            prop="member_type"-->
<!--            label="单位"-->
<!--            width="100">-->
<!--          <template slot-scope="scope">-->
<!--            {{ scope.row.member_type === '0'?'个人账号':''}}-->
<!--            {{ scope.row.member_type === '1'?'创作者账号':''}}-->
<!--            {{ scope.row.member_type === '2'?'企业':''}}-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="status"-->
<!--            label="状态"-->
<!--            width="80">-->
<!--          <template slot-scope="scope">-->
<!--            <statusLight :light="parseInt(scope.row.status)"></statusLight>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
            label="关注"
        width="100">
          <template slot-scope="scope">
            <el-link @click="$router.push({ path: '/focus', query: { member_id: scope.row.member_id } })">
              {{scope.row.following_count}}
            </el-link>
<!--            /-->
<!--            <el-link @click="$router.push({ path: '/fans', query: { member_id: scope.row.member_id } })">-->
<!--              {{scope.row.follower_status}}-->
<!--            </el-link>-->
<!--            /-->
<!--            <el-link @click="$router.push({ path: '/focus', query: { member_id: scope.row.member_id } })">-->
<!--              {{scope.row.total_favorited}}-->
<!--            </el-link>-->
          </template>
        </el-table-column>
        <el-table-column
            prop="follower_count"
            label="粉丝">
        </el-table-column>
        <el-table-column
            prop="aweme_count"
            label="作品数量">
        </el-table-column>
        <el-table-column
            prop="region"
            label="国家">
        </el-table-column>
        <!--        <el-table-column-->
        <!--            label="视频"-->
        <!--            width="320">-->
        <!--          <template slot-scope="scope">-->
        <!--            <span-->
        <!--                style="font-weight:bold;width:90px;margin-right: 20px ;display: inline-block;">总：{{scope.row.video_count}}条</span>-->
        <!--            <el-button @click="handleClick(scope.row,'video')" type="primary" size="small">查看</el-button>-->
        <!--            <el-button @click="handleClick(scope.row,'comment')" type="warning" size="small" :disabled="disabled01">采集-->
        <!--            </el-button>-->
        <!--            <el-button @click="handleClick(scope.row,'reLoad')" type="info" size="small">刷新</el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column-->
        <!--            label="操作"-->
        <!--            width="200">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button @click="handleClick(scope.row,'operate')" type="primary" size="small">编辑账户</el-button>-->
        <!--            &lt;!&ndash;            <el-switch style="margin-left: 20px;"&ndash;&gt;-->
        <!--            &lt;!&ndash;                       v-model="scope.row.value"&ndash;&gt;-->
        <!--            &lt;!&ndash;                       active-color="#409eff"&ndash;&gt;-->
        <!--            &lt;!&ndash;                       inactive-color="#d7d7d7" @change="operation(scope.row)">&ndash;&gt;-->
        <!--            &lt;!&ndash;            </el-switch>&ndash;&gt;-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
    </el-col>

  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        tableData: [],
        limit: 15,
        page: 1,
      }
    },
    mounted() {
      console.log(this.$route.query.member_id)
      this.getFollow()
    },
    methods: {
      getFollow() {
        this.$api.getfollowinglist({
            member_id: this.$route.query.member_id,
          },
          {
            params: {},
          })
          .then((res) => {
            console.log(res)
            if (res.status == 200) {
              this.followingList()
            }
          })
        // .catch((error) => {
        //   this.$message.error('请求错误')
        // })
      },
      followingList() {
        this.tableData = []
        this.$api.followingList_index({
            limit: this.limit,
            page: this.page,
            member_id: this.$route.query.member_id,
          },
          {
            params: {},
          })
          .then((res) => {
            console.log(res)
            this.tableData = res.data.data.list
          })
        // .catch((error) => {
        //   this.$message.error('请求错误')
        // })
      },
      handleSelectionChange() {
      },
    },
  }
</script>

<style lang="less" scoped>

</style>
