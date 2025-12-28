<script setup lang='ts'>
import useUserStore from '@/stores/system/user';
import { searchConfig, contentConfig, modalConfig, dynamicTableConfig } from './index.config'
import { storeToRefs } from 'pinia';
import PageModal from '@/components/dynamic-table/PageModal.vue';
import { useDynamicTable } from '@/hooks/useDynamicTable';
const {
  info,
  dialogVisible,
  handleSaveOrEditClick,
  createOrEditHandle,
  deleteClickHandle,
  search,
  reset,
  pageChangeHandle,
  sizeChangeHandle,
} = useDynamicTable(dynamicTableConfig);

const userStore = useUserStore();
const { userPage } = storeToRefs(userStore);

</script>

<template>
  <div class="user">
    <PageSearch :config="searchConfig" @reset="reset" @search="search" />
    <PageContent :config="contentConfig" :list="userPage.list" :total="userPage.totalCount"
      @page-change="pageChangeHandle" @size-change="sizeChangeHandle" @delete="deleteClickHandle"
      @save="handleSaveOrEditClick" @edit="handleSaveOrEditClick">
      <template #enable="{ val }">
        <el-button size="small" :type="val === 1 ? 'success' : 'danger'" plain>
          {{ val ? '启用' : '禁用' }}
        </el-button>
      </template>
    </PageContent>
    <PageModal v-model="dialogVisible" :config="modalConfig" :edit-data="info" @create-or-edit="createOrEditHandle" />
  </div>
</template>
<style lang="less" scoped></style>
