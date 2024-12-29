<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    portfolio:{
        type:Object,
        required: true,
    }
});

</script>

<template>
        <div class="inside">
            <a  class="portfolio" href="/portfolio">
                <img class="img" src="../images/sample.jpg" alt="Portfolio Image" />
            </a>
            <div class="bottom">
                <div class="bottom_left">
                    <div class="p_name">{{portfolio.name}}</div>
                    <div class="badge">
                        <img src="../images/badge1.webp" alt="badge1" class="badge_img">
                        <img src="../images/badge2.webp" alt="badge2" class="badge_img">
                        <img src="../images/badge3.webp" alt="badge3" class="badge_img">
                    </div>
                </div>
                <div class="bottom_right">
                    <button class="p_likes" id="bookmarkBtn">♥️</button>
                    <div class="likes_count">{{ portfolio.rate }}</div>
                </div>
            </div>                
        </div>

</template>


<style scoped>
    @import './main.css'
</style>