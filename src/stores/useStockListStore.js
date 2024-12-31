import { defineStore } from "pinia";
import axios from "axios";

export const useStockListStore = defineStore("stockList", {
  state: () => ({
    offset: 0, // 페이지네이션 오프셋
    sortType: "ascending", // 정렬 기능 대비용 필드, 현재는 Mock 상태
    stockList: [{ id: 1, name: "Apple Inc.", code: "AAPL", market: "nasdaq", price: "460000", likes: 16, doILikeThis: false },
      { id: 2, name: "Tesla", code: "TSLA", market: "nasdaq", price: "246000", likes: 16, doILikeThis: false }],
    totalLength: 3,
  }),
  persist: {
    storage: sessionStorage,
  },
  getters: {
    stockListResult: (state) => state.stockList,
    stockListOffset: (state) => state.offset,
    stockListLikes: (state) => state.stockList.map((value) => value.doILikeThis),
    stockListTotalLength: (state) => state.totalLength,
  },
  actions: {
    async getStockListItem(id) {
      // 렌더링 및 링크 목적의 단일한 항목의 정보를 요청하여 반환
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
    async getStockList(offset = 0, text = "") {
      // 전체 리스트를 반환
      try {
        // TODO: 크롤링 서버 URL로 바꾸기
        const response = await axios.get("https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock/list", {
          params: {
            text: text,
            offset: offset,
            requestLength: false,
          },
        });
        // console.log(response.data);
        // TODO: 조건에 따른 정렬 기능 추가?(아래는 좋아요 개수 많은 순서대로 정렬이 필요한 경우)
        // response.data.result.sort((a, b) => b.likes - a.likes);
        this.stockList = response.data.result;
        this.offset = offset;
        this.totalLength = response.data.result.length;
        return response.data.result.slice(this.offset, this.offset + 30);
      } catch (e) {
        // console.log(e.message);
        return this.stockList;
      }
    },
    async getStocks() {
      try {
        // TODO: 크롤링 서버 URL로 바꾸기
        const response = await axios.get("https://aaefca20-f361-4d2c-bc81-3db58a3ae355.mock.pstmn.io/stock/list", {
          params: {
            text: text,
            offset: 0,
            requestLength: false,
          },
        });
        return response.data.result;
      } catch (e) {
        return this.stockList;
      }
    },
    async getNextList() {
      // 다음 리스트로 페이지네이션을 위해 변경
      this.offset = this.offset + 30;
      try {
        return await this.getStockList(this.offset, "");
      } catch (e) {
        return this.stockList.slice(this.offset, this.offset + 30);
      }
    },
    async getPrevList() {
      // 이전 리스트로 페이지네이션을 위해 변경
      if (this.offset >= 30) {
        this.offset = this.offset - 30;
      }
      try {
        const result = await this.getStockList(this.offset, "");
        return result;
      } catch (e) {
        return this.stockList.slice(this.offset, this.offset + 30);
      }
    },
    async setStockLikes(id) {
      // Note: 이 함수는 만약 종목 목록에서 직접 좋아요를 누를 경우를 대비해 만들었으며, 필요 없을 수도 있음
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
      // Note: 이 함수는 만약 종목 목록에서 직접 좋아요를 해제할 경우를 대비해 만들었으며, 필요 없을 수도 있음
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
