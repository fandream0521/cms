<script setup lang='ts'>
import useLoginStore from '@/stores/login';
import { storeToRefs } from 'pinia';

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const loginStore = useLoginStore();
const { menuList } = storeToRefs(loginStore);
console.log('menu', menuList)
</script>

<template>
  <div class="main-menu">
    <div class="logo">
      <img src="@/assets/imgs/logo.svg" width="45px" />
      <h1 class="title">
        宏源管理系统
      </h1>
    </div>
    <el-menu active-text-color="#ffd04b" background-color="#001529" class="el-menu" text-color="#fff" @open="handleOpen"
      @close="handleClose">
      <template v-if="menuList">
        <template v-for="(menu, index) in menuList" :key="menu.id">
          <SubMainMenu :index="index + ''" :menu="menu" />
        </template>
      </template>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.main-menu {


  .logo {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 10px 0;

    .title {
      font-size: 18px;
      color: white;
    }
  }

  .el-menu {
    border: none;
  }
}
</style>
