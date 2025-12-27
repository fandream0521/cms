import { getAllDepartmentList, getDepartmentList } from '@/services/department'
import type { DepartmentListResult, DepartmentSearchDto } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useDepartmentStore = defineStore('department', () => {
  const departmentPage = ref<DepartmentListResult>({
    list: [],
    totalCount: 0,
  })

  const fetchDepartmentList = async (params: DepartmentSearchDto) => {
    const res = await getDepartmentList(params)
    departmentPage.value = res
    console.log('userList:', res)
  }

  const fetchAllDepartmentList = async () => {
    const res = await getAllDepartmentList()
    departmentPage.value = res
    console.log('userList:', res)
  }

  return {
    departmentPage,
    fetchDepartmentList,
    fetchAllDepartmentList,
  }
})

export default useDepartmentStore
