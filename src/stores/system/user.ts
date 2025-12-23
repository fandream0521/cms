import type { UserInfo } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserStore = defineStore('user', () => {
  const userPageList = ref<UserInfo[]>([])

  return {
    userPageList,
  }
})

export default useUserStore
