<script>
// 링크를 무시하고 URL로 접근하면 안 되는 모듈에 접근하려고 한 경우 대신 송출
export default {
  name: "Error403",
};
</script>
<template>
  <div class="big-center">403 Forbidden</div>
  <div class="small-center">요청한 페이지에 접근할 권한이 없습니다.</div>
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
