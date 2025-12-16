import type { MenuList, Menu } from '@/types/menu.type'
import { request } from '..'

export function getMenuListByRoleId(roleId: number) {
  return request.get<Menu[]>(`/role/${roleId}/menu`)
}

export function getMenuList() {
  return request.post<MenuList>('/menu/list', {
    offset: 0,
    size: 10,
    name: '',
  })
}
