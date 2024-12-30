<script>
// 서버가 예외를 던진게 클라이언트로 전달되는 경우 이 모듈을 표시
export default {
  name: "Error50X",
};
</script>
<template>
  <div class="big-center">Server Error</div>
  <div class="small-center">서버의 동작 중 오류가 발생했습니다.</div>
</template>
<style scoped>
.big-center {
  text-align: center;
  font-size: large;
}

.small-center {
  text-align: center;
  font-size: small;
}
</style>
