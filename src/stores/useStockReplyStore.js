import { defineStore } from "pinia";

export const useStockReplyStore = defineStore("stockReply", {
    state: () => ({
        replies: []
    }),
    actions: {
        async getStockReplyListByCreatedAt(stockId, offset) {
            //axios 넣기
        },
        async setStockReply(userId, stockId, content) {
            //axios
        },
        async updateStockReply(stockId, replyId) {

        },
        async deleteReply(replyId) {

        }
    }
})