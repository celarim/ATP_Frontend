<script setup>
import Portfolio from './portfolio.vue';
import { usePortfolioListStore } from '../stores/usePortfolioListStore';
const portfolioListStore = usePortfolioListStore();

import { onMounted } from 'vue'
import { useLoadingStore } from '../stores/useLoadingStore'

const loadingStore = useLoadingStore()


//포트폴리오 목록 동적으로 불러오기
onMounted(async () => {
    loadingStore.startLoading()
    await portfolioListStore.getPortfolioList()
    loadingStore.stopLoading()
})

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
            <Portfolio v-for = "port in portfolioListStore.portfolios" :portfolio = "port"></Portfolio>
        </div>
    </div>
</template>

<style scoped>
    @import './main.css'
</style>