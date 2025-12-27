<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import type { DepartmentSearchDto, UserCreateOrUpdateDto } from '@/types';
import { searchConfig, contentConfig, modalConfig } from './index.config'
import { storeToRefs } from 'pinia';
import PageModal from '@/components/dynamic-table/PageModal.vue';
import useDepartmentStore from '@/stores/system/department';
const searchForm = reactive<DepartmentSearchDto>({
  curPage: 1,
  size: 10
})

const departmentStore = useDepartmentStore();

const userInfo = ref<UserCreateOrUpdateDto | null>({} as unknown as UserCreateOrUpdateDto);



const { departmentPage } = storeToRefs(departmentStore);


onMounted(() => {
  departmentStore.fetchDepartmentList(searchForm)
})
const dialogVisible = ref(false);
</script>

<template>
  <div class="department">
    <PageSearch :config="searchConfig" />
    <PageContent :config="contentConfig" :list="departmentPage.list" :total="departmentPage.totalCount" />
    <PageModal v-model="dialogVisible" :config="modalConfig" :edit-data="userInfo" />
  </div>
</template>

<style lang="less" scoped></style>
