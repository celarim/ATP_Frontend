import { defineStore } from "pinia";

export const useProductStore = defineStore('portfolioDetail',{
    state: () => ({
        // portfolioDetail: [
        //     {
        //         "idx" : '',
        //         "name": "",
        //         "created_at": '',      //"2024-10-02 00:00:00",
        //         "updated_at": '',       //2024-10-02 00:00:00",
        //         "author": "",
        //         "portfolio_quantity": {
        //             "Coca-cola": '',
        //             "Pepsi": '',
        //             "Keurig Dr Pepper": ''
        //         },
        //         "total_profit" : '',
        //         "total_diviend": '',
        //         "total_tax": '',
        //         "rank": ''
        //     }
        // ],

    }),

    actions: {
        async getportfolioDetail(idx) {
            const response = await axios.get(
                ""
            );
            this.products = response.data;
        },
        async setportfolioDetail(idx) {

        },

        async updateportfolioDetail(idx) {

        }
    }, 
});
