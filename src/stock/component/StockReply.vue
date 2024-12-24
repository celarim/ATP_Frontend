<script setup>
import { defineProps } from 'vue';
import { useStockReplyStore } from '../../stores/useStockReplyStore';

const props = defineProps({
    reply: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="card shadow mb-4 card-row">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">{{ reply.userName }}</h6>
            <p class="replycard-info">작성일자: {{ reply.createdAt }} <br>
                최종 수정일자:  {{ reply.updatedAt }} </p>
            <div style="display: flex;">
                <form method="POST">
                    <input type="button" name="reply_likes" value="♥️" class="reply_likes" />
                </form>
                <p style="margin-left: 5px;">{{ reply.likesCount }}</p>
            </div>

        </div>
        <div class="card-body">
            {{ reply.content }}
        </div>
    </div>
</template>

<style>
@import '/src/common/sb-admin-2.min.css';
</style>