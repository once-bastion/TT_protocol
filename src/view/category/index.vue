<!--类别页面-->
<template>
  <div>
    <!--表格-->
    <el-col :span="24">
      <!--添加-->
      <el-button type="success" icon="el-icon-plus" @click="dialogVisible = true,add=true,title = '添加类别'"
                 style="margin-right: 10px;">添加
      </el-button>
      <!--删除-->
      <el-popconfirm title="T﹏T  确定要删除吗" @confirm="deleteFromData">
        <el-button type="danger" slot="reference" icon="el-icon-delete" :disabled="disabled">删除</el-button>
      </el-popconfirm>
      <el-tooltip class="item" effect="dark" content="回收站" placement="right">
        <el-button style="margin:0 10px;" type="info" icon="el-icon-delete-solid"
                   @click="dialogVisible = true,revoke=true,title = '误删的类别'" circle>
        </el-button>
      </el-tooltip>
      <el-table
          border
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%;margin-top:30px">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <!--          <el-table-column-->
        <!--              prop="headimage_id"-->
        <!--              label="账号"-->
        <!--              width="">-->
        <!--          </el-table-column>-->
        <!--          <el-table-column-->
        <!--              prop="password"-->
        <!--              label="密码"-->
        <!--              width="90">-->
        <!--          </el-table-column>-->
        <el-table-column
            prop="typecontrol_id"
            label="编号"
            width="250">
        </el-table-column>
        <el-table-column
            prop="type_title"
            label="名称">
        </el-table-column>
        <!--        <el-table-column-->
        <!--            prop="status"-->
        <!--            label="状态"-->
        <!--            width="">-->
        <!--          <template slot-scope="scope">-->
        <!--            &lt;!&ndash;              {{scope.row.status}}&ndash;&gt;-->
        <!--            <statusLight :light="parseInt(scope.row.status)"></statusLight>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
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
        <!--        <el-table-column-->
        <!--            label="操作">-->
        <!--          <template slot-scope="scope">-->
        <!--       -->
        <!--            -->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
    </el-col>

    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <div v-if="add">
        选择类别：
        <el-select v-model="value" style="margin-top: 10px;" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.typecontrol_id"
              :label="item.type_title"
              :value="item.typecontrol_id" @change="changeSelect">
          </el-option>
        </el-select>
        <br/>
        输入类别名：
        <el-input v-model="input_type"></el-input>
      </div>
      <div v-if="revoke">
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
              prop="typecontrol_id"
              label="编号"
              width="50">
          </el-table-column>
          <el-table-column
              prop="type_title"
              label="名称">
          </el-table-column>
          <el-table-column
              label="操作">
            <template slot-scope="scope">
              <el-button style="margin:0 10px;" type="info" icon="el-icon-refresh-left"
                         @click="dialogVisible = true,revoke=true,title = '误删的类别'">撤回
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false,revoke = false,add = false">取 消</el-button>
    <el-button type="primary" @click="uploadType()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: "index",
    data() {
      return {
        title: '',
        tableData: [],
        dialogVisible: false,
        add: false,
        revoke: false,
        disabled: true,
        input_type: '',
        value: '',
        options: [],

        deleteData: [],
      }
    },
    created() {
    },
    mounted() {
      this.typeList()
    },
    methods: {
      async typeList() {
        this.$api.typecontrol_list({},
          {
            params: {},
          })
          .then((res) => {
            this.tableData = []
            console.log(res.data.data)
            this.tableData = res.data.data
            this.options = res.data.data
          })
      },
      handleSelectionChange(val) {
        console.log(val)
        this.deleteData = []
        val.forEach((e) => {
          this.deleteData.push(parseInt(e.typecontrol_id))
        })
        console.log(this.deleteData)
        this.disabled = !val[0]
      },
      operation(val) {
        console.log(val)
      },
      search() {
        // this.nickName(val,5,this.)
      },
      handleClose(done) {
        // done();
        this.dialogVisible = false
        this.revoke = false
        this.add = false
      },
      changeSelect() {
      },
      uploadType() {
        console.log(this.value, this.input_type)
        this.typeAdd()
        this.visible()
      },
      visible() {
        this.dialogVisible = false
      },
      typeAdd() {
        this.$api.typecontrol_add({
            pid: this.value,
            type_title: this.input_type
          },
          {
            params: {},
          })
          .then((res) => {
            console.log(res)
            // this.$router.go(0)
            this.typeList()
            this.dialogVisible = false
          })
      },
      async deleteFromData() {
        await this.softDel()
        await this.typeList()
      },
      // 软删除
      softDel() {
        this.$api.typecontrol_del({
            typecontrol_ids: this.deleteData.toLocaleString()
          },
          {
            params: {},
          })
          .then((res) => {
            console.log(res)
            // this.$router.go(0)
            this.typeList()
            this.dialogVisible = false
          })
      },
      typeDel() {
        this.$api.typecontrol_del({
            typecontrol_ids: this.deleteData.toLocaleString()
          },
          {
            params: {},
          })
          .then((res) => {
            console.log(res)
            // this.$router.go(0)
            this.typeList()
            this.dialogVisible = false
          })
      },
      reBack() {

      },

    },
  };
</script>
<style lang="less" scoped>
  /deep/ td:nth-child(3) > .cell {
    text-align: left !important;
  }
</style>
