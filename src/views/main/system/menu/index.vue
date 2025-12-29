<script setup lang='ts'>
import useMenuStore from '@/stores/system/menu';
import { contentConfig, dynamicTableConfig } from './index.config';
import { storeToRefs } from 'pinia';
import { useDynamicTable } from '@/hooks/useDynamicTable';

const menuStore = useMenuStore();
const { menuTree } = storeToRefs(menuStore);

useDynamicTable(dynamicTableConfig);
</script>

<template>
  <div class="menu">
    <PageContent :config="contentConfig" :list="menuTree" :total="0" />
  </div>
</template>

<style lang="less" scoped></style>
