import { createWebHistory, createRouter } from 'vue-router'

import Main from '../common/Main.vue'
import PortfolioDetail from '../portfolio/PortfolioDetail.vue';
import StockDetail from '../stock/StockDetail.vue';
import CreateP from '../portfolio/PortCreate.vue'
import StockList from '../stock/StockList.vue';
import Login from '../user/Login.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/create_p', component: CreateP},
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