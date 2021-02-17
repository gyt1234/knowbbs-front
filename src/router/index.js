import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    children: [
      {
        path: '/home1',
        component: () => import(/* webpackChunkName: "welcome" */ '../views/Home1.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
