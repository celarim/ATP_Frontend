import { defineStore } from 'pinia';
export const usePortfolio = defineStore('portfolio',{
    state:()=>({
        portfolios:[
            {name: "포트폴리오 1", badge : "뱃지1", rate:"300"},
            {name: "포트폴리오 2", badge : "뱃지2", rate:"250"},
            {name: "포트폴리오 3", badge : "뱃지3", rate:"200"},
            {name: "포트폴리오 4", badge : "뱃지1", rate:"150"},
            {name: "포트폴리오 5", badge : "뱃지2", rate:"100"}
        ]
    }),
    getters:{
        getPortfolios:(state)=>state.portfolios
    }
})