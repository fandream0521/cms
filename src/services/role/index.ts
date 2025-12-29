import type { RoleListResult, RoleSearchDto } from '@/types/role.type'
import { request } from '..'

export function getAllRoleList() {
  return request.post<RoleListResult>('/role/list', {
    offset: 0,
    size: 100,
  })
}

export function getRoleList(dto: RoleSearchDto) {
  const queryDto = {
    ...dto,
    offset: (dto.curPage - 1) * dto.size,
  }
  return request.post<RoleListResult>('/role/list', queryDto)
}
