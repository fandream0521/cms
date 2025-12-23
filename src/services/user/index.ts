import type { UserInfo, UserSearchDto } from '@/types'
import { request } from '..'

export function getUserById(id: number) {
  return request.get<UserInfo>(`/users/${id}`)
}

export function getUserList(dto: UserSearchDto) {
  return request.post<UserInfo[]>('/users/list', dto)
}
