import { defineStore } from 'pinia';
// import axios from 'axios';

export const useStockListStore = defineStore('stockList', {
  state: () => ({stockList: [{name:"Tesla", code:"TSLA", price: "26000" }, {name:"Apple Inc.", code:"AAPL", price: "46000" }, {name:"Microsoft", code:"MSFT", price: "43200" }]}),
  getters: {
    stockListResult: (state) => state.stockList,
  },
  actions: {
    getStockListItem: (id) => {
      /*
      axios.get("https://95cee9b4-d7be-49a0-be81-b8e0cc900857.mock.pstmn.io/...", {params:{id:id}})
        .then((result) => {
          stockList.push(result.data);
      });
      */
     return [];
    },
    getStockList: (offset, tickercode) => {
      /*
      axios.get("https://95cee9b4-d7be-49a0-be81-b8e0cc900857.mock.pstmn.io/...", {params:{...}})
        .then((result) => {
          stockList.push(result.data);
      });
      */
      return [];
    },
    deleteStockList: (id) => { // Note: 보기 원하지 않는 종목 필터링에 재활용 가능?
       /*
      axios.delete("https://95cee9b4-d7be-49a0-be81-b8e0cc900857.mock.pstmn.io/...", {params:{offset:offset}})
        .then((result) => {
          stockList.push(result.data);
      });
      */
    }
  },
  
})