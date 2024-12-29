import { createWebHistory, createRouter } from 'vue-router'

import Main from '../common/Main.vue'
import userPort from '../common/userPort.vue'
import CreatePortfolio from '../portfolio/PortCreate.vue'

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