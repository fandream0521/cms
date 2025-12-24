<script setup lang='ts'>
import { onMounted, reactive } from 'vue';
import UserContent from './components/UserContent.vue';
import UserSearch from './components/UserSearch.vue';
import type { UserSearchDto } from '@/types';
import useUserStore from '@/stores/system/user';

const searchForm = reactive<UserSearchDto>({
  curPage: 1,
  size: 10
})

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUserList(searchForm)
})

</script>

<template>
  <div class="user">
    <UserSearch v-model="searchForm" />
    <UserContent v-model="searchForm" />
  </div>
</template>
<style lang="less" scoped></style>
