import { createUser, deleteUser, getUserList, updateUser } from '@/services/user'
import type { UserCreateOrUpdateDto, UserInfoPage, UserSearchDto } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserStore = defineStore('user', () => {
  const userPage = ref<UserInfoPage>({
    list: [],
    totalCount: 0,
  })

  const fetchUserList = async (params: UserSearchDto) => {
    const res = await getUserList(params)
    userPage.value = res
    console.log('userList:', res)
  }

  const deleteUserInfo = async (id: number) => {
    await deleteUser(id)
  }

  const createUserInfo = async (dto: UserCreateOrUpdateDto) => {
    const res = await createUser(dto)
    console.log(res)
  }

  const updateUserInfo = async (dto: UserCreateOrUpdateDto) => {
    const res = await updateUser(dto)
    console.log(res)
  }

  return {
    userPage: userPage,
    fetchUserList,
    createUserInfo,
    updateUserInfo,
    deleteUserInfo,
  }
})

export default useUserStore
