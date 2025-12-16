<script setup lang='ts'>
import MainMenu from '@/components/main-menu/MainMenu.vue';
import MainHeader from '@/components/main-header/MainHeader.vue';

</script>

<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside width="200px" class="aside">
        <main-menu />
      </el-aside>
      <el-container>
        <el-header height="50px" class="header">
          <main-header />
        </el-header>
        <el-main class="content">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.main {
  height: 100%;

  .main-container {
    height: 100%;

    .aside {
      background-color: #001529;
    }

    .header {
      background-color: green;
    }

    .content {
      // background-color: blue;
    }
  }
}
</style>
