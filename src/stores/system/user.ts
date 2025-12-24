import { getUserList } from '@/services/user'
import type { UserInfoPage, UserSearchDto } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserStore = defineStore('user', () => {
  const userPage = ref<UserInfoPage>({
    list: [],
    totalCount: 0,
  })

  const fetchUserList = async (params: UserSearchDto) => {
    const userList = await getUserList(params)
    userPage.value = userList
    console.log('userList:', userList)
  }

  return {
    userPage: userPage,
    fetchUserList,
  }
})

export default useUserStore
