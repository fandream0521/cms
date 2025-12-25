import type { UserInfo, UserSearchDto, UserInfoPage } from '@/types'
import { request } from '..'

export function getUserById(id: number) {
  return request.get<UserInfo>(`/users/${id}`)
}

export function getUserList(dto: UserSearchDto) {
  const queryDto = {
    ...dto,
    offset: (dto.curPage - 1) * dto.size,
  }
  return request.post<UserInfoPage>('/users/list', queryDto)
}

export function deleteUser(id: number) {
  return request.delete(`/users/${id}`)
}
