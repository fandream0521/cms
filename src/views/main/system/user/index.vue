<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue';
import UserContent from './components/UserContent.vue';
import UserSearch from './components/UserSearch.vue';
import type { UserInfo, UserSearchDto } from '@/types';
import useUserStore from '@/stores/system/user';
import UserModal from './components/UserModal.vue';

const searchForm = reactive<UserSearchDto>({
  curPage: 1,
  size: 10
})

const userStore = useUserStore();

const userInfo = ref<UserInfo>({} as unknown as UserInfo);
const handleSaveUser = (user: UserInfo | null) => {
  if (user) {
    userInfo.value = user;
  }
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
