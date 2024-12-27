import { createWebHistory, createRouter } from 'vue-router'
import { useUserStore } from '../stores/useUserStore';

import Main from '../common/Main.vue'
import PortfolioDetail from '../portfolio/PortfolioDetail.vue';
import StockDetail from '../stock/StockDetail.vue';
import CreateP from '../portfolio/PortCreate.vue'
import StockList from '../stock/StockList.vue';
import Login from '../user/Login.vue';


const checkLogin = async (from, to, next) => {
  // 로그인을 확인하는 코드 실행
  const result = await useUserStore().checkLogin();
  console.log(result);
  if(result) {
      return next();
  }
  next("/login");


}

const routes = [
  { path: '/', component: Main },
  { path: '/create_p', component: CreateP },
  { path: '/portfolio/:idx', component: PortfolioDetail},
  { path: '/stock/:idx', component: StockDetail},
  { path: '/stockList', component: StockList},
  { path: '/login', component: Login}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;