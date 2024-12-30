import { defineStore } from 'pinia';
import axios from 'axios';

export const useStockListStore = defineStore('stockList', {
    state: () => ({ 
        offset: 0, 
        requestType: "", 
        stockList: [
        {id:1, name:"Tesla", code:"TSLA", market:"nasdaq", price: "26000" }, 
        {id:2, name:"Apple Inc.", code:"AAPL", market:"nasdaq",  price: "46000" },
        {id:3, name:"Microsoft", code:"MSFT", market:"nasdaq",  price: "43200" }
        ],
        stocks: []
    }),
    getters: {
        stockListResult: (state) => state.stockList.slice(state.offset, state.offset + 30),
        stockListOffset: (state) => state.offset
    },
    actions: {
        async getStockListItem(id) {
        try { // TODO: URL 바꾸기
            return await axios.get(`https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock/item`, {params:{
            id:id,
            }}).result.slice(offset, offset+ 30);
        } catch (e) {
            this.$state = {stockList:[]};
            return this.$state.stockList;
        }
        },
        async getStockList(offset=0, text="", requestType="") {
        try {
            // TODO: 서버 URL 교체 필요
            const response = await axios.get(`https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock/list`, {params:{
            text: text,
            offset:offset,
            requestType:requestType
            }})
            // TODO: 조건에 따른 정렬 기능 추가?
            console.log(response.data);
            return response.data.result.slice(this.$state.offset, this.$state.offset + 30);        
        } catch (e) {
            console.log(e.message);
            this.$state = {stockList:[]};
            return this.$state.stockList;
        }
        },
        canSeePrev(){
        return this.$state.offset >= 30;
        },
        async getNextList() {
        return await this.getStockList(this.$state.offset + 30, this.$state.requestType);
        },
        async getPrevList() {
        if (this.$state.offset >= 30) {
            return await this.getStockList(this.$state.offset -30, this.$state.requestType);
        }
        return this.$state.stockList;
        },
        
        deleteStockList (id) { // Note: set과 update처럼 쓸모가 없는지 애매함
        this.$state.stockList[id] = null;
        return this.$state.stockList;
        },

        //NOTE: portCreate.vue를 위한 임시 주식 데이터
        async getStocks(){
            const response = await axios.get("/sample/stockList.json");
            this.stocks = response.data;
        }
        
    },
})