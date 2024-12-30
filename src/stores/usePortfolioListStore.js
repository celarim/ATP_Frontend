import { defineStore } from "pinia";
import axios from "axios";

export const usePortfolioListStore = defineStore("portfolioList", {
    state: () => ({
        portfolios: [],
        isLoading: false, // 로딩 상태 초기화
        error: null, // 에러 상태 추가
    }),
    actions: {
        async getPortfolioList() {
            const response = await axios.get("/sample/portfolioList.json");
            this.portfolios = response.data;
        },
    },
});