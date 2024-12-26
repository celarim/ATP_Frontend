<script setup>
import {ref,reactive, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const addCount = ref(1);
const stockData = ref({
    stocks:[{
        name:'',
        quantity : 0,
        price:0,
    }]
})

const addBtn = () => {
    addCount.value++;
    stockData.value.stocks.push({
        name: '',
        quantity: 0,
        price: 0,
    });
}

const sum = computed(() => {
    return stockData.value.stocks.reduce(
        (total, stock) => total + stock.quantity * stock.price, 0
    );
});

//주식 검색
const stocks = ref([
    { "name": "Apple", "k_name": "애플", "code": "AAPL" },
    { "name": "Alphabet A", "k_name": "구글 A", "code": "GOOGL" },
    { "name": "Alphabet C", "k_name": "구글 C", "code": "GOOG" },
    { "name": "Microsoft", "k_name": "마이크로소프트", "code": "MSFT" }
]);
const isListVisible = ref(false);
const showList = (index) => {
    isListVisible.value = index;
};

const filteredStocks = computed(() => {
    return stockData.value.stocks.map((stock, index) => {
        const searchQuery = stock.name.toLowerCase();
        return stocks.value.filter(stockItem =>
            stockItem.name.toLowerCase().includes(searchQuery) ||
            stockItem.k_name.toLowerCase().includes(searchQuery) ||
            stockItem.code.toLowerCase().includes(searchQuery)
        );
    });
});

// 선택된 주식을 입력 필드에 넣고 목록을 숨기는 함수
const selectStock = (stockName, index) => {
    stockData.value.stocks[index].name = stockName;
    isListVisible.value = false;
};

// blur 시 목록 숨기기
const hideList = () => {
    setTimeout(() => {
        isListVisible.value = false;
    }, 100);
};

// 날짜
const openDatePicker = (index) => {
    const datePickers = document.querySelectorAll('.hidden-date-picker');
    if (datePickers[index]) {
        datePickers[index].focus(); // 숨겨진 date input에 포커스를 줌
    }
};

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
                <div class="stock_name">Stock</div>
                <div class="stock_quantity">Quantity</div>
                <div class="stock_price">Price</div>
                <div class="stock_date">Date</div>
                <div class="stock_count">Count</div>
            </div>

            <!-- Field Inputs Row -->
            <div id="field-wrapper">
                <!-- Initial Field Container -->
                <div class="field-container" v-for = "list, index in addCount" :key="index" >
                    <div class="stock_list">
                        <input type="text" placeholder="Enter stock name" v-model="stockData.stocks[index].name" @focus="showList(index)" @input="showList(index)" @blur="hideList" />
                        <!-- 검색 결과 리스트를 출력, isListVisible이 true일 때만 보여줌 -->
                        <ul v-if="isListVisible === index && filteredStocks[index].length > 0" class="stock-list">
                            <li v-for="(stock, i) in filteredStocks[index]" :key="i" @click="selectStock(stock.name, index)">
                                {{ stock.name }}
                            </li>
                        </ul>
                    </div>
                    <input class="stock_quantity" type="number" placeholder="0" v-model="stockData.stocks[index].quantity"/>
                    <input class="stock_price" type="number" placeholder="0" v-model="stockData.stocks[index].price"/>
                    <button class="date-button" @click="openDatePicker(index)">
                        <img src="../images/calendar.svg" alt="Calendar" /></button>
                    <input type="date" class="hidden-date-picker" />
                    <p class="stock_count">{{ stockData.stocks[index].quantity * stockData.stocks[index].price }}</p>
                </div>
                <div class="stock_count">구매 금액 합계 : {{ sum }}</div>
                <div class="field-input">
                    <button @click="addBtn" class="add-field-button" type="button">+</button>
                </div>
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import './portCreate.css'
</style>