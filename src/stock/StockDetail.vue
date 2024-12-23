<script setup>
import { onMounted, ref } from 'vue';
import StockReply from './component/StockReply.vue';
import { useStockDetailStore } from '../stores/useStockDetailStore';
import { useRoute } from 'vue-router';

const route = useRoute();
const offset = ref(0);
const stockReplyStore = useStockReplyStore();
const stockDetailStore = useStockDetailStore();
onMounted(async () => {
    await stockDetailStore.getStockDetail()
    await stockReplyStore.getStockReplyByCreatedAt(route.params.idx, offset);
})
</script>

<template>

    <!-- Main Content -->
    <div id="content">

        <!-- Begin Page Content -->
        <div class="container-fluid">

            <!-- Page Heading -->
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 class="h3 mb-0 text-gray-800">아무거나 포트폴리오</h1>
                <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                        class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
            </div>

            <!-- Content Row -->
            <div class="row">

                <!-- Earnings (Monthly) Card Example -->
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-primary shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        STARTED WITH(투자 금액)</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Earnings (Monthly) Card Example -->
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-success shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        CURRENT ASSETS(현재 자산)</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Earnings (Monthly) Card Example -->
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-info shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">PROFIT
                                        RATE(수익률)
                                    </div>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">+150%</div>
                                        </div>
                                        <div class="col">
                                            <div class="progress progress-sm mr-2">
                                                <div class="progress-bar bg-info" role="progressbar" style="width: 50%"
                                                    aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pending Requests Card Example -->
                <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-warning shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        RATINGS(평가 손익)</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-comments fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content Row -->

            <div class="row">
                <!-- Pie Chart -->
                <div class="col-xl-4 col-lg-5">
                    <div class="card shadow mb-4">
                        <!-- Card Header - Dropdown -->
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                            <div class="dropdown no-arrow">
                                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                    aria-labelledby="dropdownMenuLink">
                                    <div class="dropdown-header">Dropdown Header:</div>
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <!-- Card Body -->
                        <div class="card-body">
                            <div class="chart-pie pt-4 pb-2">
                                <canvas id="myPieChart"></canvas>
                            </div>
                            <div class="mt-4 text-center small">
                                <span class="mr-2">
                                    <i class="fas fa-circle text-primary"></i> 테슬라
                                </span>
                                <span class="mr-2">
                                    <i class="fas fa-circle text-success"></i> 아마존
                                </span>
                                <span class="mr-2">
                                    <i class="fas fa-circle text-info"></i> 구글
                                </span>
                                <span class="mr-2">
                                    <i class="fas fa-circle text-danger"></i> 애플
                                </span>
                                <span class="mr-2">
                                    <i class="fas fa-circle text-warning"></i> 마이크로소프트
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Portfolio 종목 Column (6/12) -->
                <div class="col-xl-8 col-lg-7">
                    <!-- 포트폴리오 종목 카드 -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">포트폴리오 종목</h6>
                        </div>
                        <div class="card-body">
                            <!-- 종목 목록을 한 줄에 5개 배치 -->
                            <div class="d-flex flex-wrap justify-content-between">

                                <!-- 종목 1 -->
                                <div style="width: 48%;" class="mb-4">
                                    <div class="d-flex align-items-center">
                                        <img src="https://images.therich.io/images/logo/us/AAPL.png" alt="AAPL"
                                            style="width: 40px; height: 40px; margin-right: 10px;">
                                        <h4 class="small font-weight-bold m-0">애플</h4>
                                        <span class="ml-auto font-weight-bold">20%</span>
                                    </div>
                                    <div class="progress mt-2">
                                        <div class="progress-bar bg-danger" role="progressbar" style="width: 20%"
                                            aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>

                                <!-- 종목 2 -->
                                <div style="width: 48%;" class="mb-4">
                                    <div class="d-flex align-items-center">
                                        <img src="https://images.therich.io/images/logo/us/MSFT.png" alt="MSFT"
                                            style="width: 40px; height: 40px; margin-right: 10px;">
                                        <h4 class="small font-weight-bold m-0">마이크로소프트</h4>
                                        <span class="ml-auto font-weight-bold">40%</span>
                                    </div>
                                    <div class="progress mt-2">
                                        <div class="progress-bar bg-warning" role="progressbar" style="width: 40%"
                                            aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>

                                <!-- 종목 3 -->
                                <div style="width: 48%;" class="mb-4">
                                    <div class="d-flex align-items-center">
                                        <img src="https://images.therich.io/images/logo/us/GOOGL.png" alt="GOOGL"
                                            style="width: 40px; height: 40px; margin-right: 10px;">
                                        <h4 class="small font-weight-bold m-0">구글</h4>
                                        <span class="ml-auto font-weight-bold">60%</span>
                                    </div>
                                    <div class="progress mt-2">
                                        <div class="progress-bar bg-info" role="progressbar" style="width: 60%"
                                            aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>

                                <!-- 종목 4 -->
                                <div style="width: 48%;" class="mb-4">
                                    <div class="d-flex align-items-center">
                                        <img src="https://images.therich.io/images/logo/us/TSLA.png" alt="TSLA"
                                            style="width: 40px; height: 40px; margin-right: 10px;">
                                        <h4 class="small font-weight-bold m-0">테슬라</h4>
                                        <span class="ml-auto font-weight-bold">80%</span>
                                    </div>
                                    <div class="progress mt-2">
                                        <div class="progress-bar bg-primary" role="progressbar" style="width: 80%"
                                            aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>

                                <!-- 종목 5 -->
                                <div style="width: 48%;" class="mb-4">
                                    <div class="d-flex align-items-center">
                                        <img src="https://images.therich.io/images/logo/us/AMZN.png" alt="AMZN"
                                            style="width: 40px; height: 40px; margin-right: 10px;">
                                        <h4 class="small font-weight-bold m-0">아마존</h4>
                                        <span class="ml-auto font-weight-bold">100%</span>
                                    </div>
                                    <div class="progress mt-2">
                                        <div class="progress-bar bg-success" role="progressbar" style="width: 100%"
                                            aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <!-- Content Row -->
            <div class="row">
                <!-- Area Chart -->
                <div class="col-xl-12 col-lg-12">
                    <div class="card shadow mb-4">
                        <!-- Card Header - Dropdown -->
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                            <div class="dropdown no-arrow">
                                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                    aria-labelledby="dropdownMenuLink">
                                    <div class="dropdown-header">Dropdown Header:</div>
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <!-- Card Body -->
                        <div class="card-body">
                            <div class="chart-area">
                                <canvas id="myAreaChart1"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <!-- Reply -->
            <div class="reply-section-title">댓글</div>
            <div class="reply">
                <div class="row">
                    <!-- Approach -->
                    <div class="card shadow mb-4 card-row">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">홍길동</h6>
                            <p class="replycard-info">작성일자: 2024-12-12<br>
                                최종 수정일자: 2024-12-12</p>
                            <form method="POST">
                                <input type="button" name="reply_likes" value="♥️" class="reply_likes" />
                            </form>

                        </div>
                        <div class="card-body">
                            <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce
                                CSS bloat and poor page performance. Custom CSS classes are used to create
                                custom components and custom utility classes.</p>
                            <p class="mb-0">Before working with this theme, you should become familiar with the
                                Bootstrap framework, especially the utility classes.</p>
                        </div>
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
</style>