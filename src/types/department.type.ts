import type { PageDataDto } from '.'

export interface DepartmentListDto {
  id: number
  name: string
  leader: string
  parentId: number | null
  createAt: string
  updateAt: string
}

export interface DepartmentListResult {
  list: DepartmentListDto[]
  totalCount: number
}

export interface DepartmentSearchDto extends PageDataDto {
  name?: string
  parentId?: number
  createAt?: [Date, Date]
}
