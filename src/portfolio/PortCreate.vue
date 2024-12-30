<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { usePortCreateStore } from '../stores/usePortCreateStore';
import { useLoadingStore } from '../stores/useLoadingStore';
import { useStockListStore } from '../stores/useStockListStore';
const stockList = useStockListStore();
const loadingStore = useLoadingStore();
const portCreate = usePortCreateStore();

// TODO : 유저 정보 받아와서 해당 params에 접근 가능한지 검증

//현재 로그인한 사용자가 장원영이라고 가정
const userInfo = ref({
    "username" : "장원영"});

const stockData = ref({ //주식 데이터
    stocks: [{
        name: '',
        quantity: 0,
        price: 0,
        date: '',
        isCh: true
    }]
});
const portfolioData = ref({//포트폴리오 데이터
    name: '포트폴리오',
    username: '',
    stocks: [],
    isEditing: false, // 편집 모드 상태
    editName: '', // 편집 중인 이름
});

//주식 검색을 위한 설정
const isListVisible = ref(false);
const showList = (index) => {
    isListVisible.value = index;
};
const filteredStocks = computed(() => {
    return stockData.value.stocks.map((stock, index) => {
        const searchQuery = stock.name.toLowerCase(); // 입력된 이름의 소문자 변환
        return stocks.value.filter(stocks =>
        stocks.name.toLowerCase().includes(searchQuery) ||
        stocks.symbol.toLowerCase().includes(searchQuery) ||
        stocks.k_name.toLowerCase().includes(searchQuery)
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
const nameRemove = (index) => {
    stockData.value.stocks[index].name = '';
    isListVisible.value = false;
};

//create 모드와 update 모드를 구분하기 위한 임시 함수와 변수
const portStatus = ref(true); //true면 포트폴리오 생성 페이지, false면 포트폴리오 수정 페이지
const resetData = () => { //버튼 누를 때마다 데이터 초기화
    stockData.value = {
        stocks: [{
            name: '',
            quantity: 0,
            price: 0,
            date: '',
            isCh: true,
        }],
    };
    portfolioData.value = {
        name: '포트폴리오',
        username: '',
        stocks: [],
        isEditing: false,
        editName: '',
    };
};
const statusBtn = async () => {
    if (isRequestInProgress) return; // 로딩 중에는 중단
    resetData(); // 입력 데이터 초기화
    portStatus.value = !portStatus.value; // 상태 변경
    if (!portStatus.value) {
        await loadPortfolio(); // 포트폴리오 데이터 다시 불러오기
    }
};

let isRequestInProgress = false; //Too many request 방지 플래그
const dataList = ref(1);
//포트폴리오 받아오기
const loadPortfolio = async () => {
    if (isRequestInProgress) return; // 요청 진행 중이면 중단
    isRequestInProgress = true;

    try{
        if (portStatus.value === false) {
            loadingStore.startLoading();
            await portCreate.getPortfolio(userInfo.value.username);  // 포트폴리오 데이터 불러오기
            
            const portfolio = portCreate.stocks || []; // stocks가 undefined일 경우 빈 배열로 초기화
            // 포트폴리오 이름과 유저 이름
            portfolioData.value.name = portCreate.name || "포트폴리오";
            // 주식 데이터 설정
            portfolioData.value.stocks = [...portfolio];
            dataList.value = portfolio.length; // 동적으로 입력 필드의 개수를 설정
        }
    }catch(error){
        console.error("Error loading portfolio:", error);
    } finally{
        isRequestInProgress = false;
        loadingStore.stopLoading();
    }
};
// 포트폴리오 상태가 변경될 때마다 불러오기
watch(portStatus, () => {
    loadPortfolio();
});

// onMounted 내에서 최초 데이터 로드 (필요시)
onMounted(() => {
    if (portStatus.value === false) {
        loadPortfolio();
    }
});

//주식 리스트 가져오기
const stocks = ref([]);
onMounted(async () => {
    loadingStore.startLoading();
    await stockList.getStocks();
    stocks.value = [...stocks.value, ...stockList.stocks];
    loadingStore.stopLoading();
});

//+버튼을 누르면 포트폴리오 입력 추가
const addCount = ref(1);
const addBtn = () => {
    addCount.value++;
    stockData.value.stocks.push({
        name: '',
        quantity: 0,
        price: 0,
        date: '',
        isCh:true,
    });
}
// x 눌러서 주식 삭제 버튼
const stockDelete = (index) => {
    if (index >= 0 && index < stockData.value.stocks.length) {
        stockData.value.stocks.splice(index, 1); // 해당 인덱스 항목 제거
        addCount.value = stockData.value.stocks.length; // 남은 항목 수로 업데이트
    }
};

//입력한 주식 값 계산
const sum = computed(() => {
    return stockData.value.stocks.reduce(
        (total, stock) => total + stock.quantity * stock.price, 0
    );
});

//새로 삽입한 주식 데이터 전송
const createBtn = async () => {
    loadingStore.startLoading();
    try {
        await portCreate.setPortfolio({
            name: portfolioData.value.name,
            username: userInfo.value.username,
            stocks: stockData.value.stocks,
        });
        console.log('Portfolio created successfully');
    } catch (error) {
        console.error('Error creating portfolio:', error);
    } finally {
        loadingStore.stopLoading();
    }
};

//수정한 포트폴리오 전송
const updateBtn = async () => {
    loadingStore.startLoading();
    try {
        await portCreate.updatePortfolio({
            name: portfolioData.value.name,
            username: userInfo.value.username,
            stocks: portfolioData.value.stocks,
        });
        console.log('Portfolio updated successfully');
    } catch (error) {
        console.error('Error updating portfolio:', error);
    } finally {
        loadingStore.stopLoading();
    }
};

// 왼쪽영역
ChartJS.register(ArcElement, Tooltip, Legend);
// 포트폴리오 이름 편집 모드 활성화
const enableEditing = () => {
    portfolioData.value.editName = portfolioData.value.name; // 기존 이름을 불러옴
    portfolioData.value.isEditing = true;
};
// 이름 변경 적용 및 편집 모드 비활성화
const applyNameChange = () => {
  portfolioData.value.name = portfolioData.value.editName.trim(); // 이름 저장 (앞뒤 공백 제거)
  portfolioData.value.isEditing = false; // 편집 모드 비활성화
};
// 색상 팔레트 배열
const smartColors = [
    '#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0', 
    '#673AB7', '#00BCD4', '#607D8B', '#3F51B5', '#E91E63'
];
// 이미 사용된 색상들을 저장할 배열 (주식 항목과 색상 매칭)
const usedColors = ref([]);
// 팔레트에서 랜덤 색상 생성 (중복 방지)
function generateUniqueColor() {
    let color;
    do {
        color = smartColors[Math.floor(Math.random() * smartColors.length)];
    } while (usedColors.value.includes(color)); // 이미 사용된 색상인지 체크
    usedColors.value.push(color); // 새로 생성된 색상을 사용된 색상 배열에 추가
    return color;
}
// 차트 데이터
const checkedStocks = computed(() => {
    return portfolioData.value.stocks.filter(stock => stock.isCh);
});

const chartData = computed(() => {
    // 1. 체크된 항목만 필터링 (포트폴리오와 추가 항목 병합)
    const allCheckedStocks = [...portfolioData.value.stocks, ...stockData.value.stocks].filter(stock => stock.isCh);

    // 2. 주식 데이터를 그룹화 및 계산
    const groupedStocks = allCheckedStocks.reduce((acc, stock) => {
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


//차트 설정
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
        <div class="left-section"> <!-- Left Section -->
            <div class="donut_name">
                <p v-if="!portfolioData.isEditing" @dblclick="enableEditing" class="editable-text" aria-placeholder="portfolio"> {{ portfolioData.name }} </p>
                <input v-model="portfolioData.editName" v-else type="text" @blur="applyNameChange" 
                    @keydown.enter="applyNameChange" class="editable-input" />
            </div>
            <div class="donut">
                <Doughnut :data="chartData" :options="chartOptions" />
            </div>
            <div>
                <button @click="statusBtn">On/Off</button>
            </div>
            <p>On : 포트폴리오 신규 생성, Off : 기존 포트폴리오 수정</p>
        </div>
        <div class="right-section"> <!-- Right Section -->
            <div class="field-labels"> <!-- Field Labels Row -->
                <div class="stock_check"></div>
                <div class="stock_name">Stock</div>
                <div class="stock_quantity">Quantity</div>
                <div class="stock_price">Price</div>
                <div class="stock_date">Date</div>
                <div class="stock_count">Count</div>
                <div class="stock_delete"></div>
            </div>
            <div id="field-wrapper">
                <!--포트폴리오 수정 페이지 - 저장된 포트폴리오 불러오기-->
                <div v-if="!portStatus" class="field-labels" v-for="(portStock, index) in portfolioData.stocks" :key="index">
                    <div class="stock_check">
                        <input type="checkbox" v-model="portStock.isCh"/>
                    </div>
                    <div class="stock_name">
                        <div class="stock_list">
                            <input type="text" placeholder="Enter stock name" v-model="portStock.name" 
                            @focus="showList(index)" @input="showList(index)" @blur="hideList" />
                            <img :class="['xmark', portStock.name === '' ? 'xmarkhide' : 'xmarkshow']" src="../images/x.svg"
                            @click="nameRemove(index)"/>
                            <ul v-if="isListVisible === index">
                                <li v-if="filteredStocks[index].length == 0">검색 결과가 없습니다</li>
                                <li v-for="(stock, i) in filteredStocks[index]" :key="i" @click="selectStock(portStock.name, index)">
                                    {{ stock.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="stock_quantity">
                        <input type="number" placeholder="0" v-model="portStock.quantity"/>
                    </div>
                    <div class="stock_price">
                        <input type="number" placeholder="0" v-model="portStock.price"/>
                    </div>
                    <div class="stock_date">
                        <input type="date" v-model="portStock.date"/>
                    </div>
                    <div class="stock_count_p">
                        <p>{{ portStock.quantity * portStock.price }}</p>
                    </div>
                    <div class="stock_delete">
                        <button @click="stockDelete(index)" class="add-field-button"> X </button>
                    </div>
                </div>
                <!--포트폴리오 생성 페이지-->
                <div class="field-labels" v-for="(stock, index) in stockData.stocks" :key="index">
                    <div class="stock_check">
                        <input type="checkbox" v-model="stock.isCh"/>
                    </div>
                    <div class="stock_name">
                        <div class="stock_list">
                            <input type="text" placeholder="Enter stock name" v-model="stock.name" 
                            @focus="showList(index)" @input="showList(index)" @blur="hideList" />
                            <img :class="['xmark', stock.name === '' ? 'xmarkhide' : 'xmarkshow']" src="../images/x.svg"
                            @click="nameRemove(index)"/>
                            <ul v-if="isListVisible === index">
                                <li v-if="filteredStocks[index].length == 0">검색 결과가 없습니다</li>
                                <li v-for="(stock, i) in filteredStocks[index]" :key="i" @click="selectStock(stock.name, index)">
                                    {{ stock.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="stock_quantity">
                        <input type="number" placeholder="0" v-model="stock.quantity"/>
                    </div>
                    <div class="stock_price">
                        <input type="number" placeholder="0" v-model="stock.price"/>
                    </div>
                    <div class="stock_date">
                        <input type="date" v-model="stock.date"/>
                    </div>
                    <div class="stock_count_p">
                        <p>{{ stock.quantity * stock.price }}</p>
                    </div>
                    <div class="stock_delete">
                        <button @click="stockDelete(index)" class="add-field-button"> X </button>
                    </div>
                </div>
                <!--FIX : 구매 금액 합계 동작 확인-->
                <div class="stock_sum">구매 금액 합계 : {{ sum }}</div>
                <!--TODO : updateBtn 동작 확인(for문의 영역에 맞춰 각각 나눠서 반영이 되는지)-->
                <div class="field-input">
                    <button v-if="portStatus" @click="createBtn" class="add-field-button createBtn">Create</button>
                    <button v-else @click="createBtn(), updateBtn()" class="add-field-button createBtn">Update</button>
                    <button @click="addBtn" class="add-field-button addBtn">+</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import './portCreate.css'
</style>