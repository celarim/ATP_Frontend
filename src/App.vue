<script setup>
import router from './router';
import Nav from './common/Navbar.vue'
import stockList from './components/stock/stockList.vue'
</script>

<template>

  <Nav></Nav>
  
  <router-view></router-view>

</template>