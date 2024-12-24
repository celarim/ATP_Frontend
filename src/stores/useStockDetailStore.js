import { defineStore } from "pinia";

export const useStockDetailStore = defineStore("stockDetail", {
    state: () => ({
        name: "테슬라",
        code: "TSLA",
        market: "NASDAQ",
    }),
    actions: {
        getStockDetail(stockId) {
            //axios 입력

            //axios값 바탕으로 api입력력
        }
    }
})