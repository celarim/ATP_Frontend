import { defineStore } from "pinia";
import axios from 'axios';
export const useStockDetailStore = defineStore("stockDetail", {
    state: () => ({
        name: "테슬라",
        code: "TSLA",
        market: "NASDAQ",
    }),
    actions: {
        async getStockDetail(stockId) {
            const response = await axios
                .get('https://637b1d88-d99f-48ca-b187-81bb20e3ae05.mock.pstmn.io/stock?idx='+stockId)
            this.name = response.data.name;
            this.code = response.data.code;
            this.market = response.data.market;
        }
    }
})