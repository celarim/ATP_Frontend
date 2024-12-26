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
    ]
  }),
  getters: {
    stockListResult: (state) => state.stockList.slice(state.offset, state.offset + 30),
    stockListOffset: (state) => state.offset
  },
  actions: {
    async getStockListItem(id) {
      try {
        return await axios.get(`https://95cee9b4-d7be-49a0-be81-b8e0cc900857.mock.pstmn.io/stock/item`, {params:{
          id:id,
        }}).json.result.slice(offset, offset+ 30);
      } catch (e) {
        this.$state = {stockList:[]};
        return this.$state.stockList;
      }
    },
    async getStockList(offset, requestType="") {
      try {
        if (this.$state.stockList.length === 0) { // TODO: URL 교체
          const response = await axios.get(`https://95cee9b4-d7be-49a0-be81-b8e0cc900857.mock.pstmn.io/stock/list`, {params:{
            offset:offset,
            requestType:requestType
          }})
          this.$state.stockList = response.json.result.slice(this.$state.offset, this.$state.offset + 30);
        }
        // TODO: 조건에 따른 정렬 기능?

        return this.$state.stockList.slice(offset, offset+ 30);
      } catch (e) {
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
    deleteStockList (id) { // Note: 보기 원하지 않는 종목 필터링에 재활용 가능?
       this.$state.stockList[id] = null;
       return this.$state.stockList;
    }
  },
  
})