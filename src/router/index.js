import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
Vue.use(VueRouter)
function fetchJsonp(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const callbackName = 'handleResponse_' + Math.random().toString(36).substr(2, 9);

    // 定义回调函数
    window[callbackName] = function(data) {
      resolve(data); // 将 JSONP 数据作为 Promise 的结果返回
      delete window[callbackName]; // 清理全局回调函数
      document.body.removeChild(script); // 执行完后移除 script 标签
    };

    script.src = `${url}?callback=${callbackName}`;
    script.onerror = reject; // 如果加载出错，拒绝 Promise
    document.body.appendChild(script);
  });
}

async function main() {
  try {
    const data = await fetchJsonp('https://api.ip.sb/jsonip');
    sessionStorage.setItem("ip", data.ip);
  } catch (error) {
    console.error('获取数据时出错:', error);
  }
}

main();

for (const string of document.cookie.split("; ")) {
  let arr1 = string.split("=")     //将名/值对以“=”分割开
  if (arr1[0] == "tools_remember") {
    const result = arr1[1];  //如果名为name,则结果result为名对应的值
    const cookie = 'Bearer'.concat(" ", result);
    sessionStorage.setItem('token', cookie);
  } else {
    // sessionStorage.setItem('token', 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JwSWQiOjk4NTQ3NzcxLCJzY29wZSI6WyJhbGwiXSwidXNlclNxdWFkcyI6W3sic3F1YWRJZCI6IjEiLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjEifSx7InNxdWFkSWQiOiIyNiIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMjYifSx7InNxdWFkSWQiOiIyNyIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMjcifSx7InNxdWFkSWQiOiIzMiIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMzIifSx7InNxdWFkSWQiOiIzMyIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMzMifSx7InNxdWFkSWQiOiIzNCIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMzQifSx7InNxdWFkSWQiOiIzNiIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiMzYifSx7InNxdWFkSWQiOiI0NCIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiNDQifSx7InNxdWFkSWQiOiI0NiIsInNxdWFkTmFtZSI6bnVsbCwiYXV0aG9yaXR5IjoiNDYifV0sImV4cCI6MTcyNjczODkyNCwiY2hhcmFjdGVySWQiOjIxMTQ4MjU3MjAsImp0aSI6IjhkM2MwYTZjLWEyN2EtNDMwZi05NzgwLTRmMzg5MGZiOTZlNiIsImNsaWVudF9pZCI6InNlYXQuZGMtZXZlIiwidXNlcm5hbWUiOiJkZWFyIG11bXVzYW4ifQ.eRzNJIuIZo1xKXR6oU3GASxxNldq0QY1VCrmYmMrXndDO-BPvkh7wqajkbnIsD12GK4nGcNxFtvUTK0u-gQLPKmoEBKVTEJvQCTW7f832abZD1JwrZVVBcztst6uI-J4LEkXpRL5I7TOMQslRy3A5N0zRRtkWRzt-rrgCpXfbmtobxVqSuRWFDQEbW-pMQnEsqM9_deU4R0xwM8KGCP1reoAqDr4etXVJAmO5bB8kY-hp7h_p_vFWQQ0M_BuUJNV4ayP77iQ8ojGwjC-TNu0_zyz8nD5HT6aZlQOfqyeeOX-Fe1zegR_QhuIRTqLnToDWypETcGxl750nDjVQADgug');
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
        meta: { roles: ['27', '29', '34', '43', '53'] }
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
  const url = process.env.VUE_APP_API_BASE_URL_QQ;
  response = await axios.get(url + '/qq/bind/squad/info', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem("token"),
      'ip': sessionStorage.getItem("ip"),
    }
  });
  userRole = response.data.data;
  sessionStorage.setItem('userRole', userRole);
} catch (error) {
  router.push({ path: '/no-permission' });
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
