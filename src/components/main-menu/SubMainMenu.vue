<script setup lang='ts'>
import type { Menu } from '@/types';
import { Monitor } from '@element-plus/icons-vue';
defineProps<{ menu: Menu }>()
</script>

<template>
  <template v-if="menu.children && menu.children.length > 0">
    <el-sub-menu :index="menu.url">
      <template #title>
        <el-icon color="#fff" :size="14">
          <component :is="Monitor" />
        </el-icon>
        <span>{{ menu.name }}</span>
      </template>
      <template v-for="subMenu in menu.children" :key="subMenu.id">
        <SubMainMenu :menu="subMenu" />
      </template>
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :index="'/main' + menu.url">{{ menu.name }}</el-menu-item>
  </template>
</template>

<style lang="less" scoped>
.el-menu-item {
  background-color: #00153d;
}

.el-menu-item:hover {
  background-color: blue;
}

.el-menu-item.is-active {
  background-color: blue;
  color: white;
}
</style>
