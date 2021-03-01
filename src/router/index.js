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
    path: '/index',
    name: 'Home',
    component: () => import(/* webpackChunkName: "index" */ '../views/Home.vue'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import(/* webpackChunkName: "index" */ '../views/Index.vue')
      },
      {
        path: '/fatherList/:id',
        name: 'FatherList',
        component: () => import(/* webpackChunkName: "fatherList" */ '../views/FatherList.vue')
      },
      {
        path: '/sonList',
        name: 'SonList',
        component: () => import(/* webpackChunkName: "sonList" */ '../views/SonList.vue')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
      },
      {
        path: '/content',
        name: 'Content',
        component: () => import(/* webpackChunkName: "content" */ '../views/Content.vue')
      },
      {
        path: '/user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
