<script setup lang='ts'>
import LoginPanel from './c-cpns/LoginPanel.vue';

</script>

<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  background: url("../../assets/imgs/login-bg.svg");
}
</style>
