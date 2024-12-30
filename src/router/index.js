import { createWebHistory, createRouter } from 'vue-router'
import { useUserStore } from '../stores/useUserStore';

import Main from '../common/Main.vue'
import PortfolioDetail from '../portfolio/PortfolioDetail.vue';
import StockDetail from '../stock/StockDetail.vue';
import userPort from '../common/userPort.vue'
import CreatePortfolio from '../portfolio/PortCreate.vue'
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
  routes : [
    {
      path: '/',
      component: Main,
      children: [
          {
              path: '', // 메인 페이지
              component: Main,
          },
          {
              path: 'portfoliolist/:username', // 동적 라우팅: 유저의 포트폴리오 페이지
              components: {
                  default: Main, // 메인 리스트
                  user: userPort, // 상단에 사용자 정보 표시
              },
              props: {
                  user: true, // userPort에 props로 username 전달
              },
          },
      ],
    },
    { path: '/editport', component: CreatePortfolio}
  ]
});

export default router;