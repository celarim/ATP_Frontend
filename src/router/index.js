import { createWebHistory, createRouter } from 'vue-router'

import Main from '../common/Main.vue'
import CreateP from '../common/Navbar.vue'
import PortfolioDetail from '../portfolio/PortfolioDetail.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/create_p', component: CreateP},
  { path: '/portfolio/:idx', component: PortfolioDetail}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;