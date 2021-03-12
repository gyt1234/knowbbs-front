import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
    component: () => import(/* webpackChunkName: "index" */ '../views/Index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import(/* webpackChunkName: "index" */ '../views/Index.vue'),
        meta: { title: '首页' }
      },
      {
        path: '/fatherList/:id',
        name: 'FatherList',
        component: () => import(/* webpackChunkName: "fatherList" */ '../views/FatherList.vue'),
        meta: { title: '父板块列表页' }
      },
      {
        path: '/sonList/:id',
        name: 'SonList',
        component: () => import(/* webpackChunkName: "sonList" */ '../views/SonList.vue'),
        meta: { title: '子板块列表页' }
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
        meta: { title: '登录页' }
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
        meta: { title: '注册页' }
      },
      {
        path: '/content/:id',
        name: 'Content',
        component: () => import(/* webpackChunkName: "content" */ '../views/Content.vue'),
        meta: { title: '帖子详情页' }
      },
      {
        path: '/user/:id',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
        meta: { title: '用户中心' }
      },
      {
        path: '/publish/fatherId/:fatherId',
        name: 'PublishFather',
        component: () => import(/* webpackChunkName: "publish" */ '../views/Publish.vue'),
        meta: { title: '发帖页' }
      },
      {
        path: '/publish/sonId/:sonId',
        name: 'PublishSon',
        component: () => import(/* webpackChunkName: "publish" */ '../views/Publish.vue'),
        meta: { title: '发帖页' }
      },
      {
        path: '/updateContent/:id',
        name: 'UpdateContent',
        component: () => import(/* webpackChunkName: "publish" */ '../views/Publish.vue'),
        meta: { title: '帖子修改页' }
      },
      {
        path: '/Reply/:id',
        name: 'Reply',
        component: () => import(/* webpackChunkName: "reply" */ '../views/Reply.vue'),
        meta: { title: '帖子回复页' }
      },
      {
        path: '/search/:keywords',
        name: 'Search',
        component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue'),
        meta: { title: '帖子搜索页' }
      },
      {
        path: '/reply/contentId/:id/replyId/:replyId',
        name: 'Quote',
        component: () => import(/* webpackChunkName: "reply" */ '../views/Reply.vue'),
        meta: { title: '引用回复页' }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) { // 判断是否有标题
    document.title = to.meta.title
  }
  next() // 这个一定不能忘了！不然路由不会跳转的！
})

export default router
