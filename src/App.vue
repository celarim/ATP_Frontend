<script setup>
import router from './router';
import Nav from './common/Navbar.vue'
import stockList from './components/stock/stockList.vue'
</script>

<template>

  <Nav></Nav>
  <router-link to="/create_p">포트폴리오 생성</router-link>

  <router-view></router-view>

</template>