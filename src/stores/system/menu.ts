import { getMenuTree } from '@/services/menu'
import type { Menu } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useMenuStore = defineStore('menu', () => {
  const menuTree = ref<Menu[]>([])

  const fetchMenuTree = async () => {
    const res = await getMenuTree()
    menuTree.value = res
  }

  return {
    menuTree,
    fetchMenuTree,
  }
})

export default useMenuStore
