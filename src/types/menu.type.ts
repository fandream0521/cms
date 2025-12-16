export interface Menu {
  id: number
  name: string
  parentId: number
  type: number
  sort: number
  icon: string
  url: string
  createAt: string
  updateAt: string
  children: Menu[]
}

export interface MenuList {
  list: Menu[]
  totalCount: number
}
