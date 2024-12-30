import { defineStore } from "pinia";
import axios from "axios";

export const usePortfolioRepliesStore = defineStore('portfolioReplies',{
    state: () => ({
        portfolioReplies: [
            {
                id: 1,
                userName: "JohnDoe",
                createdAt: "2024-10-03 09:30:00",
                updatedAt: "2024-10-03 10:00:00",
                content: "This portfolio looks great! How did you manage to achieve such high returns?",
                likesCount: 15,
            },
            {
                id: 2,
                userName: "JaneInvestor",
                createdAt: "2024-10-04 15:45:00",
                updatedAt: "2024-10-04 16:15:00",
                content: "Amazing portfolio selection. Any advice for beginners?",
                likesCount: 20,
            },
            {
                id: 3,
                userName: "StockGuru",
                createdAt: "2024-10-05 18:20:00",
                updatedAt: "2024-10-05 19:00:00",
                content: "Impressive gains! Did you account for recent market volatility?",
                likesCount: 10,
            },
        ],
        

    }),

    actions: {
        //포트폴리오id로 조회
        async getPortfolioRepliesByCreatedAt(idx) {
            const response = await axios.get(`https://a57d4fc0-b6d5-4291-b024-114538078baa.mock.pstmn.io/api/portfolio/${idx}/replies`);
            this.portfolioReplies = response.data; // 댓글 데이터
        },
        //포트폴리오 id
        async setPortfolioReply(idx) {

        },

        async updatePortfolioReply(idx) {

        }
    }, 
});
