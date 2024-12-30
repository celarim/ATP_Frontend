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
        async setStockReply(stockId, content) {
            //axios
            const response = await axios
                .post("link",
                    {
                        "stockId": stockId,
                        "content": content,
                    },
                    { withCredentials: true }
                )
                .catch((error)=> {
                    console.error(error);
                })
            return response.data;
        },
        async updateStockReply(replyId, content) {
            const response = await axios
                .put("link", 
                    {
                        "replyId": replyId,
                        "content": content
                    },
                    { withCredentials: true }
                )  
                .catch((error)=> {
                    console.error(error);
                });
            return response.data;
            //axios
        },
        async deleteReply(replyId) {
            const response = await axios
                .delete("link",
                    {
                        "replyId": replyId
                    },
                    { withCredentials: true }
                )
                .catch((error)=> {
                    console.error(error);
                })
            return response.data;
        },
        async setReplyLikes(replyId) {
            const response = await axios
                .post("api/stockreplylikes",
                    { "replyId": replyId },
                    {withCredentials: true}
                )
                .catch((error)=> {
                    console.error(error);
                })
            return response.data;
        },        
        async deleteReplyLikes(replyId) {
            const response = await axios
                .delete("api/stockreplylikes",
                    { "replyId": replyId },
                    {withCredentials: true}
                )
                .catch((error)=> {
                    console.error(error);
                })
            return response.data;
        }
    }
})