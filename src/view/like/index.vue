<template>
  <div class="">
    <el-col :span="24">
      <!--  -->
      <h1 class="title">视频发布</h1>
    </el-col>
    <el-col :span="24">
      <div class="title01">选择设备</div>
      <div class="title01_onece">（仅展示当前在线设备和在线账户。先勾选设备再选择账户）</div>
      <div>点击前往 <el-link class="head" @click="$router.push('/showInfo')" type="primary"> 结果页面</el-link></div>
    </el-col>
    <!--表格-->
    <el-col :span="24">
      <el-table
          border
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%;margin-top:30px">
        <!--        <el-table-column-->
        <!--            type="selection"-->
        <!--            width="55">-->
        <!--        </el-table-column>-->
        <!--   <el-table-column-->
        <!--            type="selection"-->
        <!--            width="55">-->
        <!--        </el-table-column>-->
        <!--        <el-table-column-->
        <!--            prop="uid"-->
        <!--            label="唯一ID"-->
        <!--            width="">-->
        <!--        </el-table-column>-->
        <el-table-column
            prop="uid"
            label="uid"
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
        <!--        <el-table-column-->
        <!--            prop="nickname"-->
        <!--            label="昵称"-->
        <!--            width="80">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-link type="info" @click="toLink(scope.row.unique_id)">{{scope.row.nickname}}</el-link>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column-->
        <!--            prop="country"-->
        <!--            label="国家"-->
        <!--            width="80">-->
        <!--        </el-table-column>-->
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
        <!--            width="70">-->
        <!--          <template slot-scope="scope">-->
        <!--            <statusLight :light="parseInt(scope.row.status)"></statusLight>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column-->
        <!--            label="头像"-->
        <!--            width="100">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-image-->
        <!--                style="width: 50px;height: 50px;"-->
        <!--                :src="scope.row.avatar_thumb"-->
        <!--                fit="cover"></el-image>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column-->
        <!--            prop="number"-->
        <!--            label="关注/粉丝/获赞">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-link @click="$router.push({ path: '/focus', query: { member_id: scope.row.member_id } })">-->
        <!--              {{scope.row.following_count}}-->
        <!--            </el-link>-->
        <!--            /-->
        <!--            <el-link @click="$router.push({ path: '/fans', query: { member_id: scope.row.member_id } })">-->
        <!--              {{scope.row.follower_status}}-->
        <!--            </el-link>-->
        <!--            /-->
        <!--            <el-link @click="$router.push({ path: '/focus', query: { member_id: scope.row.member_id } })">-->
        <!--              {{scope.row.total_favorited}}-->
        <!--            </el-link>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column
            prop="signature"
            label="签名">
        </el-table-column>
        <el-table-column
            label="操作"
            width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.uid)" type="primary" size="small">发布评论</el-button>
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
  </div>
</template>

<script>
  import statusLight from "../../components/statusLight/index";

  export default {
    name: "index",
    components: {
      statusLight,
    },
    data() {
      return {
        tableData: [],
        textarea: '',
        limit: 12,
        total: null,
        page:1,
      }
    },
    mounted() {
      this.getMember()
    },
    methods: {
      async pageChange(pageVal) {
        this.getImgs('', '', '', pageVal, 12)
      },
      async getMember() {
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
        console.log(`当前页: ${val}`);
      },
      handleClick(n){
        console.log(n)
        this.$router.push({path:'/usersVideo',query:{uid:n}})
      },
    },

  }
</script>

<style lang="less" scoped>
  .headBtn {
    color: #409EFF;
    font-weight: 900;
  }

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
