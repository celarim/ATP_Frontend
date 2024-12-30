<script setup>
import Portfolio from './portfolio.vue';
import { usePortfolioListStore } from '../stores/usePortfolioListStore';
import { onMounted, computed } from 'vue'
import { useLoadingStore } from '../stores/useLoadingStore'
import { ref } from 'vue';

const selectedOption = ref('view');
const loadingStore = useLoadingStore();
const portfolioList = usePortfolioListStore();

//포트폴리오 목록 동적으로 불러오기
onMounted(async () => {
    loadingStore.startLoading()
    await portfolioList.getPortfolioList()
    loadingStore.stopLoading()
})

//TODO : 카테고리에 따라 정렬 후 보여주기
const selectOption=(option)=>{
    selectedOption.value = option;
    currentPage.value = 1; // 카테고리 변경 시 첫 페이지로 이동
}
//TODO : 북마크순 정렬 고치기
const sortedPortfolios = computed(() => {
    if (selectedOption.value === 'view') {// 'view' 기준으로 내림차순 정렬
        return [...portfolioList.portfolios].sort((a, b) => b.view - a.view);
    } else if (selectedOption.value === 'bookmark') {  // 'bookmark' 기준으로 내림차순 정렬
        return [...portfolioList.portfolios].sort((a, b) => b.bookmark - a.bookmark);
    } else { // 기본 정렬 (created_at 기준으로 최신순)
        return [...portfolioList.portfolios].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
});

//TODO : 메인페이지를 재활용하여 특정 유저의 포트폴리오 목록 나타내기
//CHECKLIST
//[v] : 유저 정보 보여주는 영역
//[v] : 유저 정보 보여주는 영역과 중첩 라우트 설정

const itemsPerPage = 30; // 한 페이지당 표시할 포트폴리오 개수
const currentPage = ref(1); // 현재 페이지 번호
// 현재 페이지의 포트폴리오 리스트
const paginatedPortfolios = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedPortfolios.value.slice(start, end);
});

// 전체 페이지 수 계산
const totalPages = computed(() => Math.ceil(sortedPortfolios.value.length / itemsPerPage));

// 페이지 변경 함수
const changePage = (page) => {
    if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
    }
};
</script>

<template>
    <div  class="container">
        <router-view name="user" />
        <div class="p_type">
            <div class="p_category">Category</div>
            <div class="p_btn_group">
                <label data-cy="showView" class="btn_active" :class="{ selected: selectedOption === 'new' }" @click="selectOption('new')">
                    New
                </label>
                <label data-cy="showLikes" class="btn_active" :class="{ selected: selectedOption === 'view' }" @click="selectOption('view')">
                    View
                </label>
                <label data-cy="showBookM" class="btn_active" :class="{ selected: selectedOption === 'bookmark' }" @click="selectOption('bookmark')">
                    Bookmark
                </label>
            </div>
        </div>
        <hr class="line">
        <div class="outline">
            <Portfolio 
                v-for="(port, index) in paginatedPortfolios" 
                :key="index" 
                :portfolio="port" 
            />
        </div>
        <!-- 페이징 버튼 -->
        <div class="pagination">
            <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)"><</button>
            <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
            <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">></button>
        </div>
    </div>
</template>

<style>
    @import './main.css'
</style>