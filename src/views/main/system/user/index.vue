<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import UserContent from './components/UserContent.vue';
import UserSearch from './components/UserSearch.vue';
import type { UserCreateOrUpdateDto, UserSearchDto } from '@/types';
import useUserStore from '@/stores/system/user';
import UserModal from './components/UserModal.vue';

const searchForm = reactive<UserSearchDto>({
  curPage: 1,
  size: 10
})

const userStore = useUserStore();

const userInfo = ref<UserCreateOrUpdateDto>({} as unknown as UserCreateOrUpdateDto);
const handleSaveUser = (user: UserCreateOrUpdateDto | null) => {
  if (user) {
    userInfo.value = user;
  }
  console.log(userInfo.value)
  dialogVisible.value = true;
}
onMounted(() => {
  userStore.fetchUserList(searchForm)
})
const dialogVisible = ref(false);

</script>

<template>
  <div class="user">
    <UserSearch v-model="searchForm" />
    <UserContent v-model="searchForm" @save-user="handleSaveUser" />
    <UserModal v-model="dialogVisible" :user="userInfo" />
  </div>
</template>
<style lang="less" scoped></style>
