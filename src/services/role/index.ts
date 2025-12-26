import type { RoleListResult } from '@/types/role.type'
import { request } from '..'

export function getAllRoleList() {
  return request.post<RoleListResult>('/role/list', {
    offset: 0,
    size: 100,
  })
}
