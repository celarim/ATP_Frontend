import { createWebHistory, createRouter } from 'vue-router'

import Main from '../common/Main.vue'
import PortfolioDetail from '../portfolio/PortfolioDetail.vue';
import StockDetail from '../stock/StockDetail.vue';
import CreateP from '../portfolio/PortCreate.vue'

const routes = [
  { path: '/', component: Main },
  { path: '/create_p', component: CreateP},
  { path: '/portfolio/:idx', component: PortfolioDetail}
  { path: '/stock/:idx', component: StockDetail}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;