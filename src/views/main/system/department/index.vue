<script setup lang='ts'>
import { searchConfig, contentConfig, modalConfig, dynamicTableConfig } from './index.config'
import { storeToRefs } from 'pinia';
import PageModal from '@/components/dynamic-table/PageModal.vue';
import useDepartmentStore from '@/stores/system/department';
import { useDynamicTable } from '@/hooks/useDynamicTable';





const departmentStore = useDepartmentStore();
const { departmentPage } = storeToRefs(departmentStore);

const { info, dialogVisible }
  = useDynamicTable(dynamicTableConfig);
</script>

<template>
  <div class="department">
    <PageSearch :config="searchConfig" />
    <PageContent :config="contentConfig" :list="departmentPage.list" :total="departmentPage.totalCount" />
    <PageModal v-model="dialogVisible" :config="modalConfig" :edit-data="info" />
  </div>
</template>

<style lang="less" scoped></style>
