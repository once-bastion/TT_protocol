import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}
import index from '../view/index.vue'
import home from '../view/home/index.vue'
import equipment from '../view/equipment/index.vue'
import account from '../view/account/index.vue'
import createID from '../view/createID/index.vue'
import material from '../view/material/index.vue'
import headImg from '../view/headImg/index.vue'
import nickName from '../view/nickName/index.vue'
import sign from '../view/sign/index.vue'
import video from '../view/video/index.vue'
import taskLog from '../view/taskLog/index.vue'
import backPermissions from '../view/backPermissions/index.vue'
import videosPic from '../components/canvas/videosPic'
import category from '../view/category/index.vue'

const router = new Router({
  routes: [
    //配置路由的路径
    {
      path: '/',
      component: index,
      children: [
        {
          path: '/',
          component: home,
        },
        {
          path: '/home',
          component: home,
        },
        {
          path: '/equipment',
          component: equipment,
        },
        {
          path: '/account',
          component: account,
        },
        {
          path: '/createID',
          component: createID,
        },
        {
          path: '/material',
          component: material,
        },
        {
          path: '/headImg',
          component: headImg,
        },
        {
          path: '/nickName',
          component: nickName,
        },
        {
          path: '/sign',
          component: sign,
        },
        {
          path: '/video',
          component: video,
        },
        {
          path: '/taskLog',
          component: taskLog,
        },
        {
          path: '/backPermissions',
          component: backPermissions,
        },
        {
          path: '/videosPic',
          component: videosPic,
        },
        {
          path: '/category',
          component: category,
        },
      ]
    },
  ]
})
export default router;
