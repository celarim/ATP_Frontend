import { defineStore } from 'pinia';
import axios from 'axios';

export const usePortCreateStore = defineStore('portcreate', {
    state: () => ({
        name:'',
        stocks: [], // 포트폴리오에 입력한 주식 데이터
        isLoading: false, // API 요청 상태플래그
        error: null,
    }),

    //포트폴리오 생성
    actions: {
        async setPortfolio(name, stocks) {
            this.isLoading = true; // 로딩 상태 활성화
            this.error = null; // 이전 에러 초기화

            try {
                const response = await axios.post("https://58d87cff-fea4-4487-91b2-227591311b7e.mock.pstmn.io/api", stocks);
                this.stocks = response.data; // API에서 반환된 데이터를 상태에 저장
                return response.data; // 필요한 경우 호출한 곳에서 결과 사용
            } catch (error) {
                this.error = error.message || 'Failed to set portfolio';
                console.error("API Error:", error);
            } finally {
                this.isLoading = false; // 로딩 상태 비활성화
            }
        },
    },

    //포트폴리오 불러오기
    actions: {
        async getPortfolio() {
            const response = await axios.get(
                "https://58d87cff-fea4-4487-91b2-227591311b7e.mock.pstmn.io/api"
            );
            this.name = response.data.name;
            this.stocks = response.data.stocks;
            return {
                name: this.name,
                stocks: this.stocks,
            };
        }
    },
    
    //포트폴리오 갱신
    actions: {
        async updatePortfolio(name, stocks) {
            this.isLoading = true; // 로딩 상태 활성화
            this.error = null; // 이전 에러 초기화

            try {
                const response = await axios.patch("https://58d87cff-fea4-4487-91b2-227591311b7e.mock.pstmn.io/api", stocks);
                this.stocks = response.data; // API에서 반환된 데이터를 상태에 저장
                return response.data; // 필요한 경우 호출한 곳에서 결과 사용
            } catch (error) {
                this.error = error.message || 'Failed to set portfolio';
                console.error("API Error:", error);
            } finally {
                this.isLoading = false; // 로딩 상태 비활성화
            }
        },
    },
});
