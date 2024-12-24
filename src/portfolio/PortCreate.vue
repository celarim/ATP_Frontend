<script setup>
import {ref,reactive, computed } from 'vue';
const addCount = ref(1);
const addBtn = () => {
    addCount.value++;
}

const stockData = reactive({
    name:'',
    quantity : 0,
    price:0,
})

const sum = computed(() => stockData.quantity * stockData.price);


</script>

<template>
    <div class="page-container">
        <!-- Left Section -->
        <div class="left-section">
            <h2>새로운 콘텐츠 추가</h2>
            <p>여기에 새로운 내용을 추가하세요.</p>
        </div>

        <!-- Right Section -->
        <div class="right-section">
            <!-- Field Labels Row -->
            <div class="field-labels">
                <div class="stock-name-label">Stock</div>
                <div class="quantity-label">Quantity</div>
                <div class="amount-label">Price</div>
                <div class="date-label">Date</div>
                <div class="count-label">Count</div>
            </div>

            <!-- Field Inputs Row -->
            <div id="field-wrapper">
                <!-- Initial Field Container -->
                <div class="field-container" v-for = "list in addCount" >
                    <input type="text" placeholder="Enter stock name" v-model="stockData.name"/>
                    <input type="number" placeholder="0" v-model="stockData.quantity"/>
                    <input type="number" placeholder="0" v-model="stockData.price"/>
                    <button class="date-button"><img src="../images/calendar.svg" alt="Calendar" /></button>
                    <input type="date" class="hidden-date-picker" />
                    <p>{{ sum }}</p>
                </div>
                <div class="field-input add-field">
                    <button @click="addBtn" class="add-field-button" id="add-field-button" type="button">+</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import './portCreate.css'
</style>