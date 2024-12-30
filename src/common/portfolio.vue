<script setup>
import { defineProps, ref, reactive } from 'vue';

const props = defineProps({
    portfolio:{
        type:Object,
        required: true,
    }
});

const isBookmarked = ref(false); // true면 북마크
const heartsContainer = ref(null); // 하트 컨테이너 참조
const bookBtn = () => {
    // 상태에 따라 bookmark 값을 증가 또는 감소
    if (isBookmarked.value) {
        props.portfolio.bookmark--;
    } else {
        props.portfolio.bookmark++;

        // 하트 애니메이션 추가 (북마크가 활성화될 때만 실행)
        const heart = document.createElement('div');
        heart.textContent = '♥️'; // 하트 모양
        heart.classList.add('flying-heart');
        heartsContainer.value.appendChild(heart);

        // 애니메이션이 끝나면 하트를 제거
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // 북마크 상태 토글
    isBookmarked.value = !isBookmarked.value;
};
</script>

<template>
    <div class="inside">
        <!-- 지현  -->
        <!-- 뒤에 /:idx 추가 -> 전체 포트폴리오에서 클릭하면 이동  -->
        <a  class="portfolio" href="/portfolio/1">
            <img class="img" src="../images/sample.jpg" alt="Portfolio Image" />
        </a>
        <div class="bottom">
            <div class="bottom_left">
                <div class="p_name">{{portfolio.name}}</div>
                <div class="badge">
                    <!--TODO : 포트폴리오 뱃지 데이터 가져오기-->
                    <img src="../images/badge1.webp" alt="badge1" class="badge_img">
                    <img src="../images/badge2.webp" alt="badge2" class="badge_img">
                    <img src="../images/badge3.webp" alt="badge3" class="badge_img">
                    <div class="rate"> 수익률 : {{ portfolio.rate }}%</div>
                </div>
            </div>
            <div class="bottom_right">
                <p class="view">👀 {{ portfolio.view }}</p>
                <button class="bookmark" :class="{ 'active': isBookmarked }"
                @click="bookBtn">♥️ {{ props.portfolio.bookmark }}</button>
                <!-- 하트 애니메이션 컨테이너 -->
                <div class="hearts-container" ref="heartsContainer"></div>
            </div>
        </div>                
    </div>

</template>


<style>
    @import './main.css'
</style>