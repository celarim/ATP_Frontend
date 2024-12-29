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

//TODO : 카테고리에 따라 정렬 후 보여주기
//TODO : 메인페이지를 재활용하여 특정 유저의 포트폴리오 목록 나타내기
//CHECKLIST
//[] : 유저 정보 보여주는 영역
//[] : 유저 정보 보여주는 영역과 중첩 라우트 설정

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