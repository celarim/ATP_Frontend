<script setup>
import { defineProps, ref } from 'vue';
import { useUserStore } from '../../stores/useUserStore'
import { useStockReplyStore } from '../../stores/useStockReplyStore';
import { useRouter } from 'vue-router';

const props = defineProps({
    reply: {
        type: Object,
        required: true
    }
})
const router = useRouter();
const stockReplyStore = useStockReplyStore();
const userStore = useUserStore();
const isUpdate = ref(false);
//여기 reply.isLiked 추가해야함.
const isLiked = ref(props.reply?.isLiked || false);
const likesCount = ref(props.reply?.likesCount || 0);
const heartsContainer = ref(null); // 하트 컨테이너 참조


const changeUpdate = () => {
    isUpdate.value = !isUpdate.value;
}

const updateReply = async (replyId, content) => {
    await stockReplyStore.updateStockReply(replyId, content);
    router.go(0);
}

const deleteReply = async (replyId) => {
    await stockReplyStore.deleteStockReply(replyId);
    router.go(0);
}

const likeReply = async(replyId) => {
    //로그인 안했으면 못누른다.
    if(userStore.userId == null ) return;

    //withcredential이용으로 일단 막아둠
    //await stockReplyStore.setReplyLikes(replyId);
    isLiked.value = true;
    likesCount.value = likesCount.value+1;
    const heart = document.createElement('div');
        heart.textContent = '♥️'; // 하트 모양
        heart.classList.add('flying-heart');
        heartsContainer.value.appendChild(heart);
}
const dislikeReply = async (replyId) => {
    //await stockReplyStore.deleteReplyLikes(replyId);
    isLiked.value = false;
    likesCount.value = likesCount.value-1;
}

</script>

<template>
    <div class="card shadow mb-4 card-row">
        <div class="card-header py-3" style="min-width: 15rem;">
            <h6 class="m-0 font-weight-bold text-primary">{{ reply.userName }}</h6>
            <p class="replycard-info">
                작성일자: {{ reply.createdAt }} <br>
                최종 수정일자: {{ reply.updatedAt }} </p>
            <div style="display: flex;">
                <div style="display: flex;" class="me-auto align-items-lg-center">
                    <button class="like-btn ">
                        <font-awesome-icon class="like-icon" v-if="isLiked" @click="dislikeReply(reply.replyId)" :icon="['fas', 'heart']" />
                        <font-awesome-icon class="like-icon" v-else @click="likeReply(reply.replyId)"  :icon="['far', 'heart']" />
                        <div class="hearts-container" ref="heartsContainer"></div>
                    </button>
                    <p style="margin-left: 5px;">{{ likesCount }}</p>
                </div>
                <div v-if="userStore.userId === reply.userId" class="align-items-lg-center">
                    <input v-if="!isUpdate" @click="changeUpdate" type="button" name="수정" value="수정" style="height: max-content;"/>
                    <input v-else @click="updateReply(reply.replyId, reply.content)" type="button" name="수정완료" value="수정완료">
                    <input v-if="!isUpdate" @click="deleteReply(reply.replyId)" type="button" name="삭제" value="삭제" />
                    <input v-else @click="changeUpdate" type="button" name="취소" value="취소">
                </div>
            </div>

        </div>
        <div v-if="!isUpdate" class="card-body">
            {{ reply.content }}
        </div>
        <div v-else class="card-body">
            <div role="textbox" aria-multiline="true" class="_editor-expanded_ylcfx_13 border overflow-scroll" spellcheck="true"
                data-slate-editor="true" data-slate-node="value" contenteditable="true" zindex="-1"
                style="background-color: white; position: relative; white-space: pre-wrap; height: 7em;">
                <div data-slate-node="element"><span data-slate-node="text">
                     {{ reply.content }} 
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import '/src/common/sb-admin-2.min.css';
@import 'stockReply.css';
</style>