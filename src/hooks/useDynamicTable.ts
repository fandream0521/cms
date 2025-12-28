import { ref, watch } from 'vue'
import type { PageDataDto } from '@/types'

export interface DynamicTableConfig {
  fetchFn: <T extends PageDataDto>(params: T) => Promise<void>
  updateFn?: (dto: Record<string, unknown>) => Promise<void>
  createFn?: (dto: Record<string, unknown>) => Promise<void>
  deleteFn?: (id: number) => Promise<void>
}

export function useDynamicTable(config: DynamicTableConfig) {
  const searchForm = ref<Record<string, unknown> & PageDataDto>({
    curPage: 1,
    size: 10,
  })
  const dialogVisible = ref(false)
  const info = ref<Record<string, unknown> | null>({} as unknown as Record<string, unknown>)

  const handleSaveOrEditClick = (user: Record<string, unknown> | null) => {
    info.value = user
    dialogVisible.value = true
  }

  const createOrEditHandle = async (createOrEditUser: Record<string, unknown>) => {
    dialogVisible.value = false
    console.log(createOrEditUser)
    if (createOrEditUser.id) {
      await config.updateFn?.(createOrEditUser)
    } else {
      await config.createFn?.(createOrEditUser)
    }

    config.fetchFn(searchForm.value)
  }

  const deleteClickHandle = async (id: number) => {
    await config.deleteFn?.(id)
    await config.fetchFn(searchForm.value)
  }

  const search = async (dto: Record<string, unknown>) => {
    searchForm.value = { ...dto, curPage: 1, size: 10 }
  }

  const reset = async () => {
    searchForm.value = { curPage: 1, size: 10 }
  }

  const pageChangeHandle = async (curPage: number) => {
    searchForm.value.curPage = curPage
  }

  const sizeChangeHandle = async (size: number) => {
    searchForm.value.size = size
  }

  watch(
    searchForm,
    () => {
      config.fetchFn(searchForm.value)
    },
    { immediate: true, deep: true },
  )

  return {
    info,
    dialogVisible,
    handleSaveOrEditClick,
    createOrEditHandle,
    deleteClickHandle,
    search,
    reset,
    pageChangeHandle,
    sizeChangeHandle,
  }
}
