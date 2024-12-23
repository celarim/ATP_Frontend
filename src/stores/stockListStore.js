import { defineStore } from 'pinia';
// import axios from 'axios';

export const stockListStore = defineStore('stockList', {
  state: () => ({stockList: [{name:"IBM", price: "6000" }, {name:"MSFT", price: "43200" }] }),
  getters: {
    stockListResult: (state) => state,
  },
  actions: {
    getStockListItem: (id) => {
      /*
      axios.get("https://95cee9b4-d7be-49a0-be81-b8e0cc900857.mock.pstmn.io/...", {params:{id:id}})
        .then((result) => {
          stockList.push(result.data);
      });
      */
    },
    getStockList: (offset) => {
       /*
      axios.get("https://95cee9b4-d7be-49a0-be81-b8e0cc900857.mock.pstmn.io/...", {params:{...}})
        .then((result) => {
          stockList.push(result.data);
      });
      */
    },
    setStockList: (id, value) => {
       /*
      axios.put("https://95cee9b4-d7be-49a0-be81-b8e0cc900857.mock.pstmn.io/...", {params:{...}})
        .then((result) => {
          stockList[id] = result.data;
      });
      */
    },
    updateStockList: (id, value) => {
       /*
      axios.post("https://95cee9b4-d7be-49a0-be81-b8e0cc900857.mock.pstmn.io/...", {params:{offset:offset}})
        .then((result) => {
          stockList.push(result.data);
      });
      */
    },
    deleteStockList: (id) => {
       /*
      axios.delete("https://95cee9b4-d7be-49a0-be81-b8e0cc900857.mock.pstmn.io/...", {params:{offset:offset}})
        .then((result) => {
          stockList.push(result.data);
      });
      */
    }
  },
  
})