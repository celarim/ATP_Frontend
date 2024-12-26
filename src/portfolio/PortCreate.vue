<script setup>
import {ref,reactive, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { Doughnut } from 'vue-chartjs'; // Doughnut 차트를 임포트
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const addCount = ref(1);
const stockData = ref({
    stocks:[{
        name:'',
        quantity : 0,
        price:0,
        date:''
    }]
})

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

//왼쪽영역
// Chart.js 기능 등록
ChartJS.register(ArcElement, Tooltip, Legend);

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
    // 1. 주식 데이터에서 이름을 기준으로 그룹화하여 합산
    const groupedStocks = stockData.value.stocks.reduce((acc, stock) => {
        // stock의 자산 계산 (quantity * price)
        const stockValue = stock.quantity * stock.price;

        // 만약 주식 이름이 이미 존재하면 해당 항목에 자산 더하기
        const existingStock = acc.find(s => s.name === stock.name);
        if (existingStock) {
            existingStock.asset += stockValue; // 자산 값 합산
        } else {
            // 새로운 이름의 주식이 들어오면 새로운 항목 생성하여 배열에 추가
            acc.push({
                name: stock.name,
                asset: stockValue // 처음엔 자산 값으로만 설정
            });
        }
        return acc;
    }, []);

    // 2. 그룹화된 데이터를 기반으로 라벨과 데이터 준비
    const labels = groupedStocks.map(stock => stock.name);
    const data = groupedStocks.map(stock => stock.asset); // 자산 값으로 데이터 설정

    // 3. 색상 배열을 stockData와 매칭하여 관리
    const backgroundColor = labels.map((label, index) => {
        // 기존 주식 항목에 대해 이미 색상이 할당되었으면 그 색상을 재사용
        if (usedColors.value[index]) {
            return usedColors.value[index];
        } else {
            // 새 항목에 대해서만 새로운 색상 할당
            return generateUniqueColor();
        }
    });

    return {
        labels: labels.length > 0 ? labels : ['No Data'],
        datasets: [
            {
                data: data.length > 0 ? data : [0], // 데이터가 없으면 기본값 설정
                backgroundColor: backgroundColor, // 동적으로 생성된 색상 배열
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
                        <input type="checkbox" />
                    </div>
                    <div class="stock_name">
                        <div class="stock_list">
                            <input type="text" placeholder="Enter stock name" v-model="stockData.stocks[index].name" @focus="showList(index)" @input="showList(index)" @blur="hideList" />
                            <!-- 검색 결과 리스트를 출력, isListVisible이 true일 때만 보여줌 -->
                            <ul v-if="isListVisible === index && filteredStocks[index].length > 0" class="stock-list">
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
                    <button class="add-field-button createBtn">Create</button>
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