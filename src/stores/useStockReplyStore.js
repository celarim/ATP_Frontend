import { defineStore } from "pinia";

export const useStockReplyStore = defineStore("stockReply", {
    state: () => ({
        replies: [
        {
            userName: "작성자1",
            createdAt: "2024-12-23",
            updatedAt: "2024-12-23",
            likesCount: 0,
            content: "내용1내용1내용1내용1\n내용1내용1내용1내용1"
        },
        {
            userName: "작성자2",
            createdAt: "2024-12-24",
            updatedAt: "2024-12-24",
            likesCount: 1,
            content: "내용2내용2내용2내용2"
        },
        {
            userName: "작성자3",
            createdAt: "2024-12-25",
            updatedAt: "2024-12-25",
            likesCount: 123,
            content: "내용3내용3내용3내용3\n내용3내용3내용3내용3"
        },
    ]
    }),
    actions: {
        async getStockReplyListByCreatedAt(stockId, offset) {
            //axios 넣기
        },
        async setStockReply(userId, stockId, content) {
            //axios
        },
        async updateStockReply(stockId, replyId) {
            //axios
        },
        async deleteReply(replyId) {
            
        }
    }
})