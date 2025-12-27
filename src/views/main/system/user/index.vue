<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import type { UserCreateOrUpdateDto, UserSearchDto } from '@/types';
import useUserStore from '@/stores/system/user';
import { searchConfig, contentConfig, modalConfig } from './index.config'
import { storeToRefs } from 'pinia';
import PageModal from '@/components/dynamic-table/PageModal.vue';
const searchForm = reactive<UserSearchDto>({
  curPage: 1,
  size: 10
})

const userStore = useUserStore();

const userInfo = ref<UserCreateOrUpdateDto | null>({} as unknown as UserCreateOrUpdateDto);
const handleSaveOrEditUserClick = (user: UserCreateOrUpdateDto | null) => {
  userInfo.value = user;
  dialogVisible.value = true;
}

const createOrEditUserHandle = async (createOrEditUser: UserCreateOrUpdateDto) => {
  dialogVisible.value = false
  console.log(createOrEditUser)
  if (createOrEditUser.id) {
    await userStore.updateUserInfo(createOrEditUser);
  } else {
    await userStore.createUserInfo(createOrEditUser);
  }

  userStore.fetchUserList(searchForm)
}

const searchUser = async (dto: UserSearchDto) => {
  const searchDto = { ...dto, curPage: 1, size: 10 };
  userStore.fetchUserList(searchDto);
}

const reset = async () => {
  const searchDto = { curPage: 1, size: 10 };
  userStore.fetchUserList(searchDto);
}

const { userPage } = storeToRefs(userStore);
const pageChangeHandle = async (curPage: number) => {
  searchForm.curPage = curPage;
  userStore.fetchUserList(searchForm)
}

const sizeChangeHandle = async (size: number) => {
  searchForm.size = size;
  userStore.fetchUserList(searchForm)
}

const deleteClickHandle = async (id: number) => {
  await userStore.deleteUserInfo(id);
  await userStore.fetchUserList(searchForm)
}

onMounted(() => {
  userStore.fetchUserList(searchForm)
})
const dialogVisible = ref(false);

</script>

<template>
  <div class="user">
    <PageSearch :config="searchConfig" @reset="reset" @search="searchUser" />
    <PageContent :config="contentConfig" :list="userPage.list" :total="userPage.totalCount"
      @page-change="pageChangeHandle" @size-change="sizeChangeHandle" @delete="deleteClickHandle"
      @save="handleSaveOrEditUserClick" @edit="handleSaveOrEditUserClick" />
    <PageModal v-model="dialogVisible" :config="modalConfig" :edit-data="userInfo"
      @create-or-edit="createOrEditUserHandle" />
  </div>
</template>
<style lang="less" scoped></style>
