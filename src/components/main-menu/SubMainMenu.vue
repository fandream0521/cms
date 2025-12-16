<script setup lang='ts'>
import type { Menu } from '@/types';
defineProps<{ menu: Menu, index: string }>()
</script>

<template>
  <template v-if="menu.children && menu.children.length > 0">
    <el-sub-menu :index="index + ''">
      <template #title>
        <span>{{ menu.name }}</span>
      </template>
      <template v-for="(subMenu, idx) in menu.children" :key="subMenu.id">
        <SubMainMenu :index="index + '-' + idx" :menu="subMenu" />
      </template>
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :index="index + ''">{{ menu.name }}</el-menu-item>
  </template>
</template>

<style lang="less" scoped>
:deep(.el-menu-item) {
  background-color: #00153d;
}
</style>
