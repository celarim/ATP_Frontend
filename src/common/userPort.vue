<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    username: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="userProfile_block">
        <div class="userProfile_section">
            <div class="userProfile_left">
                <!--TODO : 링크 추가-->
                <a :href="`http://localhost:5173/portfoliolist/${username}`">
                    <img alt="profile" fetchpriority="high" width="128" height="128" decoding="async" data-nimg="1" style="color:transparent" src="../images/장원영.jpg">
                </a>
                <div class="userProfile_userinfo">
                    <div class="userProfile_name">
                        <!--TODO : 링크 추가-->
                        <a :href="`http://localhost:5173/portfoliolist/${username}`">{{username}}</a>
                    </div>
                    <div class="userProfile_descripton">

                    </div>
                </div>
            </div>
        </div>
        <hr class="line">
        <div class="userProfile_bottom">
            <div class="userProfile_followInfo">
                <!--TODO : 링크 추가-->
                <a class="userProfile_info" :href="`http://localhost:5173/portfoliolist/${username}`">
                    <span class="userProfile_number">0</span>
                    <span class="userProfile_text">팔로워</span>
                </a>
                <!--TODO : 링크 추가-->
                <!--TODO : 링크 추가-->
                <a class="userProfile_info" :href="`http://localhost:5173/portfoliolist/${username}`">
                    <span class="userProfile_number">0</span>
                    <span class="userProfile_text">팔로잉</span>
                </a>
            </div>
            <div class="userProfile_bottomSection">
                <div class="userProfile_icons"></div>
            </div>

        </div>

    </div>
</template>

<style scoped>
@import './userPort.css';
@import './main.css'
</style>