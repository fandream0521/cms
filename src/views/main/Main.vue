<script setup lang='ts'>
import useLoginStore from '@/stores/login';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const loginStore = useLoginStore();
const { loginUser } = storeToRefs(loginStore);
const { checkLoginStatusAction, logout } = loginStore;

const router = useRouter();


const checkLogin = async () => {
  const user = await checkLoginStatusAction();
  console.log(user);
}

const doLogout = () => {
  logout();
  router.replace('/login')
}
</script>

<template>
  <div class="main">
    <h2>counter: {{ loginUser?.name }}</h2>
    <h2>doubleCounter: {{ loginUser?.email }}</h2>
    <button @click="checkLogin">检查登录状态</button>
    <button @click="doLogout">退出</button>
  </div>
</template>

<style lang="less" scoped>
.main {
  color: red;
}
</style>
