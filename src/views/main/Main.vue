<script setup lang='ts'>
import MainMenu from '@/components/main-menu/MainMenu.vue';
import MainHeader from '@/components/main-header/MainHeader.vue';
import { ref } from 'vue';

const collapse = ref(false);
</script>

<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="collapse ? '64px' : '150px'" class="aside">
        <main-menu :collapse="collapse" />
      </el-aside>
      <el-container>
        <el-header height="50px" class="header">
          <main-header :collapse="collapse" @collapseClick="collapse = !collapse" />
        </el-header>
        <el-main class="content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.main {
  height: 100%;

  :deep(.el-header) {
    --el-header-padding: 0;
  }


  .main-container {
    height: 100%;

    .aside {
      background-color: #001529;
      transition: width .6s ease;
    }

    .content {
      background-color: blue;
    }
  }
}
</style>
