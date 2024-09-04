import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/pap',
    //  redirect: '/dcqq',
    // name: 'Home',
  },
  {
    path: '/home',
    // name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children:[
      {
        path: '/pap',
        // name: 'ChuQing',
        component: () => import(/* webpackChunkName: "about" */ '../views/Pap.vue')
      },
      {
        path: '/rankpap',
        component: () => import(/* webpackChunkName: "about" */ '../views/paiPap.vue')
      },
      {
        path: '/corporatepap',
        component: () => import(/* webpackChunkName: "about" */ '../views/gsPap.vue')
      },
      {
        path: '/alliancegs',
        component: () => import(/* webpackChunkName: "about" */ '../views/alliancegs.vue')
      },
      {
        path: '/alliancegsbind',
        component: () => import(/* webpackChunkName: "about" */ '../views/CorporateBind.vue'),
      },
      {
        path: '/seat',
        component: () => import(/* webpackChunkName: "about" */ '../views/gsSeat.vue')
      },
      {
        path: '/dcpap',
        component: () => import(/* webpackChunkName: "about" */ '../views/dcPap.vue')
      },
      {
        path: '/alliancereport',
        component: () => import(/* webpackChunkName: "about" */ '../views/allianceReport.vue')
      },
      {
        path: '/auction',
        component: () => import(/* webpackChunkName: "about" */ '../views/auction.vue')
      },
      {
        path: '/auction_moon',
        component: () => import(/* webpackChunkName: "about" */ '../views/AuctionMoon.vue')
      },
      {
        path: '/auction_sky_hook',
        component: () => import(/* webpackChunkName: "about" */ '../views/AuctionSkyHook.vue')
      },
    ]
  },
]
const originalPush = VueRouter.prototype.push
    //修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
    //解决vue路由重复导航错误
    //获取原型对象上的push函数


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
