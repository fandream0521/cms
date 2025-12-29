<script setup lang='ts'>
import { searchConfig, contentConfig, modalConfig, dynamicTableConfig } from './index.config'
import { storeToRefs } from 'pinia';
import { useDynamicTable } from '@/hooks/useDynamicTable';
import useRoleStore from '@/stores/system/role';
import useMenuStore from '@/stores/system/menu';
import { onMounted } from 'vue';


const roleStore = useRoleStore();
const { rolePage } = storeToRefs(roleStore);

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

const props = {
  label: 'name',
  children: 'children',
}

const menuStore = useMenuStore();
const { menuTree } = storeToRefs(menuStore);
interface Tree {
  label: string
  children?: Tree[]
}
const handleNodeClick = (data: Tree) => {
  console.log(data)
}

onMounted(() => {
  menuStore.fetchMenuTree();
  console.log(menuTree.value)
})
</script>

<template>
  <div class="role">
    <PageSearch :config="searchConfig" @reset="reset" @search="search" />
    <PageContent :config="contentConfig" :list="rolePage.list" :total="rolePage.totalCount"
      @page-change="pageChangeHandle" @size-change="sizeChangeHandle" @delete="deleteClickHandle"
      @save="handleSaveOrEditClick" @edit="handleSaveOrEditClick" />
    <PageModal v-model="dialogVisible" :config="modalConfig" :edit-data="info" @create-or-edit="createOrEditHandle">
      <template #menuList>
        <el-tree style="max-width: 600px" :props="props" :data="menuTree" @check-change="handleNodeClick"
          show-checkbox />
      </template>
    </PageModal>
  </div>
</template>

<style lang="less" scoped></style>
