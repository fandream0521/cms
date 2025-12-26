import type { DepartmentListResult } from '@/types/department.type'
import { request } from '..'

export function getAllDepartmentList() {
  return request.post<DepartmentListResult>('/department/list', {
    offset: 0,
    size: 100,
  })
}
