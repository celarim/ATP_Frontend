import axios from "axios";
import { defineStore } from "pinia";


export const useStockReplyStore = defineStore("stockReply", {
    state: () => ({replies:[]}),
    actions: {
        async getStockReplyListByCreatedAt(stockId, offset) {
            const response = await axios
            .get("https://637b1d88-d99f-48ca-b187-81bb20e3ae05.mock.pstmn.io/stockreply"+"?stockId="+stockId+"&offset="+offset)
            this.replies = response.data.replies;
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