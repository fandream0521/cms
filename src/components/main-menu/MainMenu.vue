<script setup lang='ts'>
import useLoginStore from '@/stores/login';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const loginStore = useLoginStore();
const { menuList } = storeToRefs(loginStore);
const route = useRoute();
defineProps({
  collapse: {
    type: Boolean
  }
})
console.log('menu', menuList)
</script>

<template>
  <div class="main-menu">
    <div class="logo">
      <div class="img">
        <img src="@/assets/imgs/logo.svg" width="24px" />
      </div>
      <h1 class="title" v-show="!collapse">
        宏源管理系统
      </h1>
    </div>
    <el-menu background-color="#001529" class="el-menu" text-color="#fff" @open="handleOpen" @close="handleClose" router
      :default-active="route.path" :collapse="collapse">
      <template v-if="menuList">
        <template v-for="menu in menuList" :key="menu.id">
          <SubMainMenu :menu="menu" />
        </template>
      </template>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.main-menu {
  overflow: hidden;

  .logo {
    display: flex;

    align-items: center;

    padding: 10px 0;

    .img {
      flex-shrink: 0;

      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      margin-left: 20px;
      margin-right: 3px;
    }

    .title {
      font-size: 16px;
      color: white;
      white-space: nowrap;
    }
  }

  .el-menu {
    border: none;
  }
}
</style>
