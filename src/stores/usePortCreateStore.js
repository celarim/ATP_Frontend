import { defineStore } from 'pinia';
import axios from 'axios';

export const usePortCreateStore = defineStore('portcreate', {
    state: () => ({
        name:"", //포트폴리오 이름
        username:"", //사용자 이름
        stocks: [], // 포트폴리오에 입력한 주식 데이터
        isLoading: false, // API 요청 상태플래그
        error: null,
    }),

    actions: {
        //포트폴리오 생성
        async setPortfolio(payload) {
            try {
                this.isLoading = true; // 로딩 상태 시작
                const response = await axios.post("/sample/createdportfolioList.json", payload);
                // this.portfolios.push(response.data);
                this.name = payload.name;
                this.stocks = payload.stocks;
            } catch (error) {
                console.error('Error creating portfolio:', error);
                throw error;
            } finally {
                this.isLoading = false; // 로딩 상태 종료
            }
        },
        
        //PortCreate.vue에서 포트폴리오 업데이트를 위한 포트폴리오 정보 불러오기
        async getPortfolio(username) {
            try {
                const response = await axios.get("/sample/createdportfolioList.json");
                // username과 일치하는 유저 검색
                const user = response.data.find(user => user.username === username);
                if (user) { // 일치하는 유저 정보 세팅
                    this.name = user.name;
                    this.username = user.username;
                    this.stocks = user.stocks;
                } else { // 유저가 없는 경우
                    console.error(`User with username "${username}" not found.`);
                }
            } catch (error) {
                console.error("Error fetching portfolio:", error);
            }
        },

        //포트폴리오 수정
        async updatePortfolio(payload) {
            try {
                const response = await axios.post('/api/updatePortfolio', payload);
                console.log('Portfolio updated:', response.data);
                // 수정된 데이터를 state에 반영
                const index = this.portfolios.findIndex(port => port.username === payload.username);
                if (index !== -1) {
                    this.portfolios[index] = response.data;
                }
            } catch (error) {
                console.error('Error updating portfolio:', error);
                throw error;
            }
        },
    },
})