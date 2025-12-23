import type { PageDataDto } from '.'

export interface UserInfo {
  id: number
  name: string
  realname: string
  roleId: number
  roleIntro: string
  status: number
  email: string
  departmentId: number
  cellphone: string
  avatar: string
  createAt: string
  updatedAt: string
  lastLoginAt: string
}

export interface UserSearchDto extends PageDataDto {
  name?: string
  realname?: string
  cellphone?: string
  enable?: number
  createAt?: [Date, Date]
}
