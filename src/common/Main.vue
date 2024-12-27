<script setup>
import Portfolio from './portfolio.vue';
import { usePortfolioListStore } from '../stores/usePortfolioListStore';
import { onMounted } from 'vue'
import { useLoadingStore } from '../stores/useLoadingStore'
import { ref } from 'vue';

const selectedOption = ref('view');
const loadingStore = useLoadingStore();
const portfolioList = usePortfolioListStore();

const selectOption=(option)=>{
    selectedOption.value = option;
}
//포트폴리오 목록 동적으로 불러오기
onMounted(async () => {
    loadingStore.startLoading()
    await portfolioList.getPortfolioList()
    loadingStore.stopLoading()
})

</script>

<template>
    <div  class="container">
        <div class="p_type">
            <div class="p_category">Category</div>
            <div class="p_btn_group">
                <label data-cy="showView" class="btn_active" :class="{ selected: selectedOption === 'view' }" @click="selectOption('view')">
                    View
                </label>
                <label data-cy="showLikes" class="btn_active" :class="{ selected: selectedOption === 'like' }" @click="selectOption('like')">
                    Like
                </label>
                <label data-cy="showBookM" class="btn_active" :class="{ selected: selectedOption === 'bookmark' }" @click="selectOption('bookmark')">
                    Bookmark
                </label>
            </div>
        </div>
        <hr class="line">
        <div class="outline">
            <Portfolio v-for = "port in portfolioList.portfolios" :portfolio = "port"></Portfolio>
        </div>
    </div>
</template>

<style scoped>
    @import './main.css'
</style>