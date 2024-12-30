import { defineStore } from "pinia";
import axios from "axios";

export const usePortfolioDetailStore = defineStore("portfolioDetail", {
  state: () => ({
    portfolioItem: 
    {
      "idx": 1,
      "name": "My First Portfolio",
      "created_at": "2024-10-02 00:00:00",
      "updated_at": "2024-10-05 12:00:00",
      "author": "User123",
      "portfolio_Stocks": [
          {
              "image": "https://images.therich.io/images/logo/us/AAPL.png",
              "name": "Apple",
              "quantity": 5
          },
          {
              "image": "https://images.therich.io/images/logo/us/MSFT.png",
              "name": "Microsoft",
              "quantity": 30
          },
          {
              "image": "https://images.therich.io/images/logo/us/GOOGL.png",
              "name": "Google",
              "quantity": 30
          },
          {
              "image": "https://images.therich.io/images/logo/us/TSLA.png",
              "name": "Tesla",
              "quantity": 80
          },
          {
              "image": "https://images.therich.io/images/logo/us/AMZN.png",
              "name": "Amazon",
              "quantity": 100
          }
      ],
      "total_profit": "$5,000",
      "total_dividend": "$500",
      "total_tax": "$100",
      "rank": 1
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
