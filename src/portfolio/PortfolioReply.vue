<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  replies: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div>
    <div v-for="reply in replies" :key="reply.id" class="card-row card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">{{ reply.userName }}</h6>
        <p>작성일자: {{ reply.createdAt }} <br />최종 수정일자: {{ reply.updatedAt }}</p>
        <!-- Todo: 좋아요 추가 -->
      </div>
      <div class="card-body">
        <p>{{ reply.content }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>


@import '../common/sb-admin-2.min.css';
@import 'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i';

    .card-row {
      flex-direction: row;
    }

    .container-fluid {
      margin-top: 10vmax;
    }

    .border {
      border: 1px;
      border-width: 2px;
      padding: 2px;
      /* border-radius: 1.5rem; */
      overflow: hidden; /* border-radius 영역을 넘어가는 콘텐츠를 숨김 */

    }

    .btn-border {
      border: 10px;
      border-color: black;
      background-color: #F0F0F0;
      border-radius: 0.5rem;
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

    @media (max-width:992px) {
      .container-fluid {
        margin-top: 20vh;
      }
    }
</style>
