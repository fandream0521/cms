import type { UserInfo } from '@/types/user.type'
import { request } from '..'

export function getUserById(id: number) {
  return request.get<UserInfo>(`/users/${id}`)
}
