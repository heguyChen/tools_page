import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './assets/css/global.css'
Vue.config.productionTip = false
import axios from "axios";
import VueI18n from 'vue-i18n';
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = axios

// axios.defaults.baseURL = "http://qq.tools.dc-eve.com"
axios.defaults.headers["Content-Type"] = "application/json";
// axios.defaults.headers["Authorization"]="Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJhbGwiXSwidXNlclNxdWFkcyI6W3sic3F1YWRJZCI6IjEiLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjEifSx7InNxdWFkSWQiOiIyIiwic3F1YWROYW1lIjpudWxsLCJhdXRob3JpdHkiOiIyIn0seyJzcXVhZElkIjoiMjMiLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjIzIn0seyJzcXVhZElkIjoiMjQiLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjI0In0seyJzcXVhZElkIjoiMjciLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjI3In0seyJzcXVhZElkIjoiMzIiLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjMyIn0seyJzcXVhZElkIjoiMzMiLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjMzIn0seyJzcXVhZElkIjoiMzQiLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjM0In0seyJzcXVhZElkIjoiMzYiLCJzcXVhZE5hbWUiOm51bGwsImF1dGhvcml0eSI6IjM2In1dLCJleHAiOjE3MDEzNTM3MjgsImNoYXJhY3RlcklkIjoyMTE0ODI1NzIwLCJqdGkiOiIxNjdlNTBlNi04YjliLTQyYmMtYTBiZC1lODk3ZTQ1ZjRmOTkiLCJjbGllbnRfaWQiOiJzZWF0LmRjLWV2ZSIsInVzZXJuYW1lIjoiZGVhciBtdW11c2FuIn0.bmr6w7aY-6zq4vJSx1LGfheeUw2j4fvPLh9HDnXkv8dLGWc6Ipmq6hO8yG0wC7fO7f-dw2PevK8eYXZ6E10pGWroQf8GM-xmv464jIVvALTFuX0Ee439jDipWSBrfBtsN2GgBXYNzOmpYQWwRgV-fEKFY-YgkkJCqDpu4bxUboO4xIFjpLd6YSaGqt5a7bnoPCSPNcllBMdAWUdjs1W0ZOtjmRQ2SjkWs5aMxqX9lPZA2LBZFm3GEeZ1ENE1pupbe4UkpN1iINz9eitF-hXZL1KszPVUhpAKgTmcDccCb9ABjvS6rF4h0I4Di_42phaJQm6B2jhfZqj9whVAHk7ikg"

Vue.use(VueI18n);
import messages from './locales'; // 导入语言文件

// 获取浏览器的语言
const browserLang = navigator.language || navigator.userLanguage; // 'en-US' 或 'zh-CN'
const lang = browserLang.split('-')[0]; // 获取语言代码，如 'en' 或 'zh'

const i18n = new VueI18n({
  locale: lang, // 浏览器语言
  messages,
});


new Vue({
  router,
  store,
  axios,
  i18n,
  render: h => h(App)
}).$mount('#app')
