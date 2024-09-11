import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
// import {asyncRequest, syncRequest} from '@/assets/js/request.js'
Vue.use(VueRouter)

for (const string of document.cookie.split("; ")) {
  var arr1 = string.split("=")     //将名/值对以“=”分割开
  if (arr1[0] == "tools_remember") {
    const result = arr1[1];  //如果名为name,则结果result为名对应的值
    const cookie = 'Bearer'.concat(" ", result);
    sessionStorage.setItem('token', cookie);
  } else {
    // sessionStorage.setItem('token', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JwSWQiOjk4NTQ3NzcxLCJzY29wZSI6WyJhbGwiXSwidXNlclNxdWFkcyI6W3sic3F1YWRJZCI6IjEiLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjEifSx7InNxdWFkSWQiOiIyNiIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMjYifSx7InNxdWFkSWQiOiIyNyIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMjcifSx7InNxdWFkSWQiOiIzMiIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMzIifSx7InNxdWFkSWQiOiIzMyIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMzMifSx7InNxdWFkSWQiOiIzNCIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMzQifSx7InNxdWFkSWQiOiIzNiIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMzYifSx7InNxdWFkSWQiOiI0NCIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiNDQifSx7InNxdWFkSWQiOiI0NiIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiNDYifV0sImV4cCI6MTcyNjA1MDgzMSwiY2hhcmFjdGVySWQiOjIxMTQ4MjU3MjAsImp0aSI6IjVjZmFlZWU1LWNmYzQtNDhhMS1iNTgxLTBhZDIwMzU5MjRhOCIsImNsaWVudF9pZCI6InNlYXQuZGMtZXZlIiwidXNlcm5hbWUiOiJkZWFyIG11bXVzYW4ifQ.BXSM5l-epfTw7XsZHy4RjnGZD11ria217BN58goV-Ll-rHa6w5Y1_rrhvoi6w-5AAmbV_8ldnJOaf95HSXAfVD16fui3SfAKfq62KP05VYGg3oYkpKt6MXWn8KcP-bmSiXWTQ8Cy-ael5g9Vhsfcab4QaV_T0kSIvEmCZgi6dR_cX5KZkYalt2nCEoL2cfp2ct58L6PLw7iZLOqF4yU3MLIrzgMaaePkIRa3iNmF6lSo8fbziz1afn32-02D5bAUTdZwkN58P0JYwHKn9s6y7WPFqEsc7Dxc2bCFTZG8BnFoVhd69dXQD11dkrbcwd41UnRrCsHDUcQi8wXoVul4NQ');
  }
};

const routes = [
  {
    path: '/',
    redirect: '/pap',
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
        component: () => import(/* webpackChunkName: "about" */ '../views/gsPap.vue'),
        // meta: { roles: ['27','50'] }
      },
      {
        path: '/alliancegs',
        component: () => import(/* webpackChunkName: "about" */ '../views/alliancegs.vue'),
        meta: { roles: ['27','50'] }
      },
      {
        path: '/alliancegsbind',
        component: () => import(/* webpackChunkName: "about" */ '../views/CorporateBind.vue'),
        meta: { roles: ['27','50'] }
      },
      {
        path: '/seat',
        component: () => import(/* webpackChunkName: "about" */ '../views/gsSeat.vue'),
        meta: { roles: ['27','50'] }
      },
      {
        path: '/dcpap',
        component: () => import(/* webpackChunkName: "about" */ '../views/dcPap.vue'),
        meta: { roles: ['27','50'] }
      },
      {
        path: '/alliancereport',
        component: () => import(/* webpackChunkName: "about" */ '../views/allianceReport.vue'),
        meta: { roles: ['27','50'] }
      },
      {
        path: '/auction',
        component: () => import(/* webpackChunkName: "about" */ '../views/auction.vue'),
        meta: { roles: ['27', '34', '43', '53'] }
      },
      {
        path: '/auction_moon',
        component: () => import(/* webpackChunkName: "about" */ '../views/AuctionMoon.vue'),
        meta: { roles: ['34', '43'] }
      },
      {
        path: '/auction_sky_hook',
        component: () => import(/* webpackChunkName: "about" */ '../views/AuctionSkyHook.vue'),
        meta: { roles: ['34', '43'] }
      },
      {
        path: '/no-permission',
        component: () => import(/* webpackChunkName: "about" */ '../components/no-permission.vue')
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

let response;
let userRole;
try {
  response = await axios.get('https://tools.dc-eve.com/qq/bind/squad/info', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("token"),
    }
  });
  userRole = response.data.data;
  sessionStorage.setItem('userRole', userRole);
} catch (error) {
  router.push({ path: '/no-permission' });
  // throw error;
  // window.location.href = '/error-page.html';
  // next({ path: '/no-permission' });
}



// 全局前置守卫
router.beforeEach((to, from, next) => {
  // const isAuthenticated = store.getters.isAuthenticated; // 检查是否登录
  // const userRole = store.getters.userRole; // 获取用户角色
  if (to.meta.roles && !userRole.some(item => to.meta.roles.includes(item))) {
    // 用户没有该页面的权限，重定向到无权限页面
    next({ path: '/no-permission' });
  } else {
    // 用户有权限，放行
    next();
  }
  // 检查路由是否需要认证
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   // if (!isAuthenticated) {
  //   //   // 用户未登录，重定向到登录页面
  //   //   next({ path: '/' });
  //   // } else
  //
  // } else {
  //   // 路由不需要认证，直接放行
  //   next();
  // }
});
export default router
