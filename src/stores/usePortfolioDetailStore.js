import { defineStore } from "pinia";
import axios from "axios";

export const usePortfolioDetailStore = defineStore("portfolioDetail", {
  state: () => ({
    portfolioItem: 
      {
        idx: 1,
        name: "My First Portfolio",
        created_at: "2024-10-02 00:00:00",
        updated_at: "2024-10-05 12:00:00",
        author: "User123",
        portfolio_quantity: {
          "Coca-Cola": 50,
          Pepsi: 30,
          "Keurig Dr Pepper": 20,
        },
        total_profit: "$5,000",
        total_dividend: "$500",
        total_tax: "$100",
        rank: 1,
    }
  }),

  actions: {
    async getportfolioDetail(idx) {
      try {
        const response = await axios.get(`https://a57d4fc0-b6d5-4291-b024-114538078baa.mock.pstmn.io/api/portfolio-details/${idx}`);
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching portfolio details:", error);
      }
    },
    async setportfolioDetail(idx) {
      // Implementation for creating a new portfolio detail
    },

    async updateportfolioDetail(idx) {
      // Implementation for updating an existing portfolio detail
    },
  },
});
