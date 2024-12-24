import { defineStore } from "pinia";

export const useStockDetailStore = defineStore("stockDetail", {
    state: () => ({
        name: "",
        code: "",
        market: "",
        stock: {},
    }),
    actions: {
        getStockDetail(stockId) {
            //axios 입력

            //axios값 바탕으로 api입력력
        }
    }
})