export interface RoleListDto {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
}

export interface RoleListResult {
  list: RoleListDto[]
  totalCount: number
}
