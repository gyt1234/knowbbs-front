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
        path: '/fatherList',
        name: 'FatherList',
        component: () => import(/* webpackChunkName: "fatherList" */ '../views/FatherList.vue')
      },
      {
        path: '/sonList',
        name: 'SonList',
        component: () => import(/* webpackChunkName: "sonList" */ '../views/SonList.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
