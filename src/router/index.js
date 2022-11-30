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
import usersVideo from '../view/video/components/usersVideo.vue'
import showInfo from '../view/video/showInfo.vue'
import videoTaskDetails from '../view/video/videoTaskDetails.vue'
import taskLog from '../view/taskLog/index.vue'
import backPermissions from '../view/backPermissions/index.vue'
import videosPic from '../components/canvas/videosPic'
import category from '../view/category/index.vue'
import focus from '../view/focus/index.vue'
import fans from '../view/fans/index.vue'
import videoUpload from '../view/videoUpload/index.vue'
import like from '../view/like/index.vue'
import attention from '../view/attention/index.vue'

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
          path: '/usersVideo',
          component: usersVideo,
        },
        {
          path: '/showInfo',
          component: showInfo,
        },
        {
          path: '/videoTaskDetails',
          component: videoTaskDetails,
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
        {
          path: '/focus',
          component: focus,
        },
        {
          path: '/fans',
          component: fans,
        },
        {
          path: '/videoUpload',
          component: videoUpload,
        },
        {
          path: '/like',
          component: like,
        },
        {
          path: '/attention',
          component: attention,
        },
        {
          path: '/attention',
          component: attention,
        },
      ]
    },
  ]
})
export default router;
//
//













































// 这个钱红林就是个铸币,这个公司的寄生虫,虫豸,内卷之王的集大成者,不学无术的斯文败类,拿前朝代码开发新式花活的愚夫腐儒,内斗之王,无耻匹夫,人间之屑,一心只看钱·宏林
// 自己用php3的技术,又老又不好使,大家替这狗东西兜底还整天吆三喝四,甩锅知道抢,吃屎不赶热乎的,天天是我和后端的兄弟给这狗东西擦屁股,
// 天天在领导面前不是这么吹牛逼就是怎么把锅甩我们,从来不听我的都意见,为啥?他自己不懂,和他讲技术完全是鸡同鸭讲,凭什么替这狗娘养的擦屁股?
// 再这样这公司迟早败他手上了,被这狗东西恶心完我就回老家了,我们江东一武夫,要不是在连队,我早把他往死里打了,想想不值当,毕竟老板的ass他尝的甜
// 接我项目的这位同志,这个项目是用的是vue,里面有大量组件开发,以及多个组件间传值,我虽然不知道您的开发经验到底多高,但如果您是个正在
// 这老不死的在这地方终究是个祸害,和这种虫豸怎么建好公司呢?

// 公贼被我赶回家了,你们后来人接受工作的时候应该会轻松一点,没人压迫你了,
// 这个阿泽表面和气,别相信他虚伪的笑容,干好自己就行,要是有过分要求你就润,别在这浪费自己的前途了
