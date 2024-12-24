import { defineStore } from "pinia";

export const usePortfolioReplyStore = defineStore('portfolioReplies',{
    state: () => ({
        // portfolioReplies: [],

    }),

    actions: {
        //포트폴리오id로 조회
        async getPortfolioRepliesByCreatedAt(idx) {
            // const response = await axios.get(
            //     ""
            // );
            // this.products = response.data;
        },
        //포트폴리오 id
        async setPortfolioReply(idx) {

        },

        async updatePortfolioReply(idx) {

        }
    }, 
});
