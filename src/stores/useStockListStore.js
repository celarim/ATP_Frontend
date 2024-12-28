import { defineStore } from "pinia";
import axios from "axios";

export const useStockListStore = defineStore("stockList", {
  state: () => ({
    offset: 0,
    requestType: "",
    sortType: "newest",
    stockList: [
      { id: 1, name: "Tesla", code: "TSLA", market: "nasdaq", price: "26000", likes: 40, doILikeThis: false },
      { id: 2, name: "Apple Inc.", code: "AAPL", market: "nasdaq", price: "46000", likes: 16, doILikeThis: false },
      { id: 3, name: "Microsoft", code: "MSFT", market: "nasdaq", price: "43200", likes: 4, doILikeThis: false },
    ],
  }),
  getters: {
    stockListResult: (state) => state.stockList.slice(state.offset, state.offset + 30),
    stockListOffset: (state) => state.offset,
    stockListLikes: (state) => state.stockList.map((value) => value.doILikeThis),
  },
  actions: {
    async getStockListItem(id) {
      try {
        // TODO: 크롤링 서버 URL로 바꾸기
        const response = await axios.get("https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock/item", {
          params: {
            id: id,
          },
        });
        // console.log(response.data);
        return response.data;
      } catch (e) {
        return this.stockList[id];
      }
    },
    async getStockList(offset = 0, text = "", requestType = "") {
      try {
        // TODO: 크롤링 서버 URL로 바꾸기
        const response = await axios.get("https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock/list", {
          params: {
            text: text,
            offset: offset,
            requestType: requestType,
          },
        });
        // console.log(response.data);
        // TODO: 조건에 따른 정렬 기능 추가?(아래는 좋아요 개수 많은 순서대로 정렬이 필요한 경우)
        // response.data.result.sort((a, b) => b.likes - a.likes);
        this.stockList = response.data;
        return response.data.result.slice(this.offset, this.offset + 30);
      } catch (e) {
        // console.log(e.message);
        this.stockList = [];
        return this.stockList;
      }
    },
    async getNextList() {
      this.offset = this.offset + 30;
      try {
        return await this.getStockList(this.offset, this.requestType);
      } catch (e) {
        return this.stockList.slice(this.offset, this.offset + 30);
      }
    },
    async getPrevList() {
      if (this.offset >= 30) {
        this.offset = this.offset - 30;
      }
      try {
        const result = await this.getStockList(this.offset, this.requestType);
        return result;
      } catch (e) {
        return this.stockList.slice(this.offset, this.offset + 30);
      }
    },
    async setStockLikes(id) {
      try {
        // TODO: 진짜 서버 URL로 바꾸기
        const result = await axios.post("https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock", {
          params: {
            id: id,
            action: "like",
          },
        });
        if (result.status === 200) {
          this.stockList[id].likes += 1;
          return this.stockList[id].likes;
        } else {
          return this.stockList[id].likes;
        }
      } catch (e) {
        return this.stockList[id].likes; // 변경하지 않음
      }
    },
    async deleteStockLikes(id) {
      try {
        // TODO: 진짜 서버 URL로 바꾸기
        const result = await axios.post("https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock", {
          params: {
            id: id,
            action: "dislike",
          },
        });
        if (result.status === 200) {
          this.stockList[id].likes -= 1;
          return this.stockList[id].likes;
        } else {
          return this.stockList[id].likes;
        }
      } catch (e) {
        return this.stockList[id].likes; // 변경하지 않음
      }
    },
  },
});
