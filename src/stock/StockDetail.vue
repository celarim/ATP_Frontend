<script setup>
import { onMounted, ref } from 'vue';
import StockReply from './component/StockReply.vue';
import { useStockDetailStore } from '../stores/useStockDetailStore';
import { useStockReplyStore } from '../stores/useStockReplyStore';
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/useUserStore';

const route = useRoute();
const offset = ref(0);
const stockReplyStore = useStockReplyStore();
const stockDetailStore = useStockDetailStore();
const userStore = useUserStore();
const chartContainer = ref(null);

const draw = async () => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
        new window.TradingView.widget({
            container_id: "chartContainer", // 고유 ID 사용
            width: "100%",
            height: "500",
            symbol: stockDetailStore.market + ":" + stockDetailStore.code,
            interval: "D",
            theme: "light",
            style: "1",
            locale: "en",
            timezone: "Etc/UTC",
        });
    };

    document.body.appendChild(script);
}


onMounted(async () => {
    await stockDetailStore.getStockDetail();
    await stockReplyStore.getStockReplyListByCreatedAt(route.params.idx, offset.value);
    await draw();
});

const setReply = async () => {
    const content = document.querySelector('[contenteditable="true"]').innerHTML;
    //const result = await stockReplyStore.setStockReply(route.params.idx, content);
}

</script>

<template>

    <!-- Main Content -->
    <div id="content">

        <!-- Begin Page Content -->
        <div class="container-fluid">

            <!-- Page Heading -->
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">주식 : {{ stockDetailStore.name }}</h1>
            </div>

            <!-- Content Row -->
            <div class="row">

                <div>
                    <h1>Trading View</h1>
                    <div id="chartContainer" style="width: 100%; height: 500px;"></div>
                </div>

                <div class="mt-1 row" >
                    <!-- Earnings (Monthly) Card Example -->
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            이 주식을 구매한 사람</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">100명</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            현재 포트폴리오에 가진 개수</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">200주</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Content Row -->



                <!-- Reply -->
                <div v-if="userStore.userId != null" class="_editor-container-expanded_ylcfx_37">
                    <div class="_placeholder_s9avi_1">댓글을 입력하세요</div>
                    <div role="textbox" aria-multiline="true" class="_editor-expanded_ylcfx_13 border"
                      spellcheck="true" data-slate-editor="true" data-slate-node="value" contenteditable="true"
                      zindex="-1" style="background-color: white; padding: 1rem; position: relative; white-space: pre-wrap; overflow-wrap: break-word;
                      min-height: 7rem;">
                      <div data-slate-node="element"><span data-slate-node="text"><span data-slate-leaf="true"><span
                              data-slate-zero-width="n" data-slate-length="0"><br></span></span></span></div>
                    </div>
                    <div class="container-btn _toolbar_k0g7a_47 ">
                      <div class="_toolbar-primary_k0g7a_51">
                        <div class="_actions_k0g7a_78"><button
                            class="comment-btn _button_8fv5d_1 _button-fill_8fv5d_15 _submit_k0g7a_84 bt"
                            type="button"><span class=" _submit-text_k0g7a_122" @click="setReply" style="color: white;">Comment</span></button></div>

                      </div>
                    </div>
                </div>
                <div class="reply-section-title">댓글</div>
                <div class="reply">
                    <div class="row">
                        <!-- Approach -->
                        <StockReply v-for="reply in stockReplyStore.replies" :reply="reply"></StockReply>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<style scoped>
@import 'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i';
@import '/src/common/sb-admin-2.min.css';

.card-row {
    flex-direction: row;
}

.container-fluid {
    margin-top: 10vmax;
}

@media (max-width:992px) {
    .container-fluid {
        margin-top: 20vh;
    }
}

.container-btn {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
    }

.comment-btn {
      margin-left: auto;
      border-radius: 8px;
      background-color: #4f74df;
      border: 1px solid #bbb;
    }
</style>