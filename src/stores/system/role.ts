import { getAllRoleList, getRoleList } from '@/services/role'
import type { RoleListDto, RoleListResult, RoleSearchDto } from '@/types/role.type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useRoleStore = defineStore('role', () => {
  const rolePage = ref<RoleListResult>({
    list: [],
    totalCount: 0,
  })
  const allRoleList = ref<RoleListDto[]>([])

  const fetchRolePage = async (dto: RoleSearchDto) => {
    const res = await getRoleList(dto)
    rolePage.value = res
  }

  const fetchAllRole = async () => {
    const res = await getAllRoleList()
    allRoleList.value = res.list
  }

  return {
    rolePage,
    fetchRolePage,
    fetchAllRole,
  }
})

export default useRoleStore
