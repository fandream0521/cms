import { deleteUser, getUserList } from '@/services/user'
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

  const deleteUserInfo = async (id: number) => {
    await deleteUser(id)
  }

  return {
    userPage: userPage,
    fetchUserList,
    deleteUserInfo,
  }
})

export default useUserStore
