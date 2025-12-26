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
