import { defineStore } from 'pinia';
import axios from 'axios';

export const portfolioList = defineStore('portfolio',{
    state:()=>({
        portfolios:[
            // {name: "포트폴리오 1", badge : "뱃지1", rate:"300", img: "../images/sample.jpg"},
            // {name: "포트폴리오 2", badge : "뱃지2", rate:"250", img: "../images/sample.jpg"},
            // {name: "포트폴리오 3", badge : "뱃지3", rate:"200", img: "../images/sample.jpg"},
            // {name: "포트폴리오 4", badge : "뱃지1", rate:"150", img: "../images/sample.jpg"},
            // {name: "포트폴리오 5", badge : "뱃지2", rate:"100", img: "../images/sample.jpg"}
        ]
    }),
    getters:{
        getPortfolios:(state)=>state.portfolios
    },
    actions: {
        async getPortfolioList() {
            const response = await axios.get(
                "https://58d87cff-fea4-4487-91b2-227591311b7e.mock.pstmn.io/api"
            );
            this.portfolios = response.data;
        }
    }
})