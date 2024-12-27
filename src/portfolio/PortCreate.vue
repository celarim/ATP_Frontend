<script setup>
import {ref,reactive, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { usePortCreateStore } from '../stores/usePortCreateStore';
import { useLoadingStore } from '../stores/useLoadingStore';
import { onMounted } from 'vue'
import { useStockListStore } from '../stores/useStockListStore';

const portStatus = true; //포트폴리오 생성, 수정 구분

const stockList = useStockListStore();
const loadingStore = useLoadingStore();
const portCreate = usePortCreateStore();
const addCount = ref(1);
const stockData = ref({
    name:'포트폴리오',
    stocks:[{
        name:'',
        quantity : 0,
        price:0,
        date:'',
        isCh:false
    }]
})
//포트폴리오 목록 동적으로 불러오기
if(!portStatus){
    onMounted(async () => {
    loadingStore.startLoading()
    stockData = await portCreate.getPortfolio()
    loadingStore.stopLoading()
    })
}

const addBtn = () => {
    addCount.value++;
    stockData.value.stocks.push({
        name: '',
        quantity: 0,
        price: 0,
        date:''
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

// 선택된 주식을 입력 필드에 넣고 목록 숨기기
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
const handleRemove = (index) => {
    stockData.value.stocks[index].name = '';
    isListVisible.value = false;
};

//생성한 포트폴리오 전송
const createBtn=()=>{
    const result = portCreate.setPortfolio(stockData.name, stockData.stocks);
    console.log(result)
}
//수정한 포트폴리오 전송
const updateBtn=()=>{
    const result = portCreate.setPortfolio(stockData.name, stockData.stocks);
    console.log(result)
}

//왼쪽영역
ChartJS.register(ArcElement, Tooltip, Legend);

const isEditing = ref(false); // 편집 모드 상태

// 편집 모드 활성화
const enableEditing = () => {
    isEditing.value = true;
};

// 편집 모드 비활성화
const disableEditing = () => {
    isEditing.value = false;
};

// 랜덤 색상 생성
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 이미 사용된 색상들을 저장할 배열 (주식 항목과 색상 매칭)
const usedColors = ref([]);
// 랜덤 색상 생성 (중복을 피해서)
function generateUniqueColor() {
    let color;
    do {
        color = generateRandomColor();
    } while (usedColors.value.includes(color)); // 이미 사용된 색상인지 체크
    usedColors.value.push(color); // 새로 생성된 색상을 사용된 색상 배열에 추가
    return color;
}

// 차트 데이터
const chartData = computed(() => {
    // 1. 체크된 항목만 필터링
    const filteredStocks = stockData.value.stocks.filter(stock => stock.isCh);

    // 2. 주식 데이터를 그룹화 및 계산
    const groupedStocks = filteredStocks.reduce((acc, stock) => {
        const stockValue = stock.quantity * stock.price;
        const existingStock = acc.find(s => s.name === stock.name);
        if (existingStock) {
            existingStock.asset += stockValue;
        } else {
            acc.push({
                name: stock.name,
                asset: stockValue,
            });
        }
        return acc;
    }, []);

    // 3. 차트 데이터 생성
    const labels = groupedStocks.map(stock => stock.name);
    const data = groupedStocks.map(stock => stock.asset);
    const backgroundColor = labels.map((_, index) =>
        usedColors.value[index] || generateUniqueColor()
    );

    return {
        labels: labels.length > 0 ? labels : ['No Data'],
        datasets: [
            {
                data: data.length > 0 ? data : [0],
                backgroundColor,
                hoverBackgroundColor: backgroundColor,
            },
        ],
    };
});

const chartOptions = ref({
    responsive: true,
    plugins: {
        legend: {
        position: 'bottom',
        },
        tooltip: {
        enabled: true,
        },
    }
});
</script>

<template>
    <div class="page-container">
        <!-- Left Section -->
        <div class="left-section">
            <div class="donut_name">
                <p v-if="!isEditing" @dblclick="enableEditing" class="editable-text" aria-placeholder="portfolio"> {{ stockData.name }} </p>
                <input v-else type="text" v-model="stockData.name" @blur="disableEditing" 
                    @keydown.enter="disableEditing" class="editable-input" />
            </div>
            <div class="donut">
                <Doughnut :data="chartData" :options="chartOptions" />
            </div>
        </div>
        

        <!-- Right Section -->
        <div class="right-section">
            <!-- Field Labels Row -->
            <div class="field-labels">
                <div class="stock_check"></div>
                <div class="stock_name">Stock</div>
                <div class="stock_quantity">Quantity</div>
                <div class="stock_price">Price</div>
                <div class="stock_date">Date</div>
                <div class="stock_count">Count</div>
            </div>

            <!-- Field Inputs Row -->
            <div id="field-wrapper">
                <!-- Initial Field Container -->
                <div class="field-labels" v-for = "list, index in addCount" :key="index" >
                    <div class="stock_check">
                        <input type="checkbox" v-model="stockData.stocks[index].isCh"/>
                    </div>
                    <div class="stock_name">
                        <div class="stock_list">
                            <input type="text" placeholder="Enter stock name" v-model="stockData.stocks[index].name" 
                            @focus="showList(index)" @input="showList(index)" @blur="hideList" />
                            <img :class="['xmark', stockData.stocks[index].name === '' ? 'xmarkhide' : 'xmarkshow']" src="../images/x.svg"
                            @click="handleRemove(index)"/>
                            <ul v-if="isListVisible === index   ">
                                <li v-if="filteredStocks[index].length == 0">검색 결과가 없습니다</li>
                                <li v-for="(stock, i) in filteredStocks[index]" :key="i" @click="selectStock(stock.name, index)">
                                    {{ stock.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="stock_quantity">
                        <input type="number" placeholder="0" v-model="stockData.stocks[index].quantity"/>
                    </div>
                    <div class="stock_price">
                        <input type="number" placeholder="0" v-model="stockData.stocks[index].price"/>
                    </div>
                    <div class="stock_date">
                        <input type="date" v-model="stockData.stocks[index].date"/>
                    </div>
                    <div class="stock_count_p">
                        <p>{{ stockData.stocks[index].quantity * stockData.stocks[index].price }}</p>
                    </div>
                </div>
                <div class="stock_sum">구매 금액 합계 : {{ sum }}</div>
                <div class="field-input">
                    <button v-if="portStatus" @click="createBtn" class="add-field-button createBtn">Create</button>
                    <button v-else @click="updateBtn" class="add-field-button createBtn">Update</button>
                    <button @click="addBtn" class="add-field-button addBtn">+</button>
                </div>
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import './portCreate.css'
</style>