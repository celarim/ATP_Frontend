import { defineStore } from "pinia";
import axios from "axios";

export const usePortfolioRepliesStore = defineStore('portfolioReplies',{
    state: () => ({
        portfolioReplies: [

        ],
        

    }),

    actions: {
        //포트폴리오id로 조회
        async getPortfolioRepliesByCreatedAt(idx) {
            const response = await axios.get(`https://a57d4fc0-b6d5-4291-b024-114538078baa.mock.pstmn.io/api/portfolio/${idx}/replies`);
            this.portfolioReplies = response.data; // 댓글 데이터
            console.log(response.data);
        },
        //포트폴리오 id
        async setPortfolioReply(idx) {

        },

        async updatePortfolioReply(idx) {

        }
    }, 
});
