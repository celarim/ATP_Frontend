import axios from "axios";
import { defineStore } from "pinia";


export const useUserStore = defineStore("user", {
    state: () => ({ id, email }),
    actions: {
        async login(email, password) {
            //axios

            return true;
        },
        async checkLogin() {
            //axios
            const response = await axios.get("link", {
                withCredentials: true,
            }).catch((error) =>  {
                //console.error(error);
                console.log("hello");
            });
            if(response == null) return null;
            return response.data.id;
        },
        async getUserDetail(id) {
            //axios
        },

        async updateUserDetailReply(password, image) {
            //axios
        },
        async deleteUser() {
            //axios
        },
    }
})