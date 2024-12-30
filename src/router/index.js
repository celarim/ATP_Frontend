import { createWebHistory, createRouter } from 'vue-router';
import { useUserStore } from '../stores/useUserStore';

// Import Components
import Main from '../common/Main.vue';
import PortfolioDetail from '../portfolio/PortfolioDetail.vue';
import StockDetail from '../stock/StockDetail.vue';
import UserPort from '../common/UserPort.vue';
import CreatePortfolio from '../portfolio/PortCreate.vue';
import StockList from '../stock/StockList.vue';
import Login from '../user/Login.vue';

// Login Check Middleware
const checkLogin = async (to, from, next) => {
  const userStore = useUserStore();
  const isLoggedIn = await userStore.checkLogin();
  console.log(isLoggedIn);
  if (isLoggedIn) {
    next();
  } else {
    next('/login');
  }
};

// Routes Configuration
const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '',
        component: Main, // Main Page
      },
      {
        path: 'portfoliolist/:username',
        components: {
          default: Main, // Main List
          user: UserPort, // User Info Display
        },
        props: {
          user: true, // Pass username as prop to UserPort
        },
      },
    ],
  },
  { path: '/portfolio/:idx', component: PortfolioDetail },
  { path: '/stock/:idx', component: StockDetail },
  { path: '/stockList', component: StockList },
  { path: '/editport', component: CreatePortfolio, beforeEnter: checkLogin },
  { path: '/login', component: Login },
];

// Router Instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;