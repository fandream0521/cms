import type { PageDataDto } from '.'

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

export interface RoleSearchDto extends PageDataDto {
  name?: string
  intro?: string
  createAt?: [Date, Date]
}
