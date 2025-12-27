import type { DepartmentListResult, DepartmentSearchDto } from '@/types/department.type'
import { request } from '..'

export function getAllDepartmentList() {
  return request.post<DepartmentListResult>('/department/list', {
    offset: 0,
    size: 100,
  })
}

export function getDepartmentList(dto: DepartmentSearchDto) {
  const queryDto = {
    ...dto,
    offset: (dto.curPage - 1) * dto.size,
  }
  return request.post<DepartmentListResult>('/department/list', queryDto)
}
