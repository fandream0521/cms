import type { UserInfo, UserSearchDto, UserInfoPage, UserCreateOrUpdateDto } from '@/types'
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

export function createUser(dto: UserCreateOrUpdateDto) {
  return request.post<{ id: number }>('/users', dto)
}

export function updateUser(dto: UserCreateOrUpdateDto) {
  return request.patch<{ updated: boolean }>(`/users/${dto.id}`, dto)
}
