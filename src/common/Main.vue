<script setup>
import {ref,reactive} from 'vue';
import Portfolio from './portfolio.vue';
// const portList = ref([
//     {name: "포트폴리오 1", badge : "뱃지1", rate:"300%" },
//     {name: "포트폴리오 2", badge : "뱃지2", rate:"250%"},
//     {name: "포트폴리오 3", badge : "뱃지3", rate:"200%" },
//     {name: "포트폴리오 4", badge : "뱃지1", rate:"150%" },
//     {name: "포트폴리오 5", badge : "뱃지2", rate:"100%" }
// ]);

import { usePortfolio } from '../stores/usePortfolio';
const portfolioList = usePortfolio();
</script>

<template>
    <div  class="container">
        <div class="p_type">
            <div class="p_category">Category</div>
            <div class="p_btn_group">
                <label data-cy="showView" class="btn_active" data-vy-value="true">
                    <input type="checkbox">
                    View
                </label>
                <label data-cy="showLikes" class="btn_active" data-vy-value="true">
                    <input type="checkbox">
                    Like
                </label>
                <label data-cy="showBookM" class="btn_active" data-vy-value="true">
                    <input type="checkbox">
                    Bookmark
                </label>
            </div>
        </div>
        <hr class="line">
        <div class="outline">
            <Portfolio v-for = "port in portfolioList.getPortfolios" :portfolio = "port"></Portfolio>
        </div>
    </div>
</template>

<style scoped>
    @import './main.css'
</style>