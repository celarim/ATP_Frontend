import axios from "axios";
import { defineStore } from "pinia";


export const useUserStore = defineStore("user", {
    state: () => ({ isLogin: true, image: "", userId: 0 }),
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

            this.isLogin = true;
            this.image = response.image;
            this.userId = response.userId;
            return true;
        },

        async logout() {
            const response = await axios.get("link", {
                withCredentials: true,
            }).catch((error) =>  {
                //console.error(error);
                console.log("hello");
            });
            if(response == null) return null;

            this.isLogin = false;
            this.image = '';
            this.userId = null;
            return true;
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