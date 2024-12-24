import { createWebHistory, createRouter } from 'vue-router'

import Main from '../common/Main.vue'
import CreateP from '../portfolio/PortCreate.vue'

const routes = [
  { path: '/', component: Main },
  { path: '/create_p', component: CreateP}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;