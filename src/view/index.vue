<template>
  <el-container>
    <el-header>
      <div class="logo">
        <div>TT</div>
        <strong> 智能云控</strong>
      </div>
      <div class="user">
        管理员:{{username}}
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
            :router="true"
            :default-active="activeIndex"
            :unique-opened="true"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose">
          <!-- 如果是单1级标题 -->
          <div v-for="(i,index) in fromList">
            <el-menu-item v-if="!(i.secondTitle)" :index="i.path">
              <i :class="i.icon"></i>
              <span slot="title">{{i.title}}</span>
            </el-menu-item>
            <!-- 如果是单2级标题 -->
            <el-submenu v-if="(i.secondTitle)" :index="i.path">
              <template slot="title">
                <i :class="i.icon"></i>
                <span>{{i.title}}</span>
              </template>
              <el-menu-item-group v-if="i.secondTitle" v-for="(item,index) in i.secondTitle">
                <el-menu-item :index="item.path">{{item.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        username: 'admin',
        activeIndex: this.$route.path.split('/')[1],
        fromList: [
          {title: '首页', path: 'home', icon: 'el-icon-s-home',},
          {title: '设备管理', path: 'equipment', icon: 'el-icon-s-tools',},
          {
            title: '账户管理',
            path: 'account',
            icon: 'el-icon-user-solid',
            secondTitle: [{title: '账户管理', path: 'account'}, {title: '创建新号', path: 'createID'},]
          },
          // {title: '素材管理', path: 'material', icon: 'el-icon-picture',},
          {
            title: '素材管理',
            path: 'material',
            icon: 'el-icon-picture',
            secondTitle: [
              {title: '视频素材', path: 'material'},
              {title: '头像', path: 'headImg'},
              {title: '昵称', path: 'nickName'},
              {title: '个性签名', path: 'sign'},
            ]
          },
          {
            title: '任务管理',
            path: 'task',
            icon: 'el-icon-s-order',
            secondTitle: [{title: '视频发布', path: 'video'},]
          },
          {title: '任务日志', path: 'taskLog', icon: 'el-icon-edit',},
          {title: '后台权限', path: 'backPermissions', icon: 'el-icon-s-platform',},
        ],
      }
    },
    mounted() {
      // console.log(this.$route.path.split('/')[1])
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
  }
</script>

<style lang="less" scoped>
  .el-header {
    background-color: #494e58;
    color: #FFF;
    font-size: 40px;
    line-height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      display: flex;
      align-items: center;

      div {
        border-radius: 50%;
        color: #fff;
        background-color: #ff0000;
        font-size: 30px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-weight: 600;
        margin-right: 10px;
        display: inline-block;
      }

      strong {
      }
    }

    .user {
      font-size: 20px;
    }
  }

  .el-aside {
    background-color: #545c64;

    .el-menu {
      border-right: 0;
      height: calc(100vh - 60px);
    }
  }

  .el-main {
    max-height: calc(100vh - 60px);
    background-color: #f9f9f9;
  }

</style>
