import { defineStore } from 'pinia';
import axios from 'axios';

export const usePortfolioListStore = defineStore('portfolioList',{
    state:()=>({
        portfolios:[]
    }),
    actions: {
        async getPortfolioList() {
            const response = await axios.get(
                "https://58d87cff-fea4-4487-91b2-227591311b7e.mock.pstmn.io/api"
            );
            this.portfolios = response.data;
            console.log(response);
        }
    }
})