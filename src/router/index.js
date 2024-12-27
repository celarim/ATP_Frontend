import { createWebHistory, createRouter } from 'vue-router'

import Main from '../common/Main.vue'
import CreatePortfolio from '../portfolio/PortCreate.vue'

const router = createRouter({
  history: createWebHistory(),
  routes : [
    { path: '/', component: Main },
    { path: '/editport', component: CreatePortfolio}
  ]
});

export default router;