export interface AccountLoginDto {
  name: string
  password: string
}

export interface LoginUserInfo {
  id: number
  name: string
  realname: string
  roleId: number
  roleIntro: string
  roleNmae: string
  status: number
  email: string
  departmentId: number
  departmentName: string
  cellphone: string
  avatar: string
  createAt: string
  updatedAt: string
  lastLoginAt: string
  loginCount: number
}

export interface LoginResult {
  token: string
  user: LoginUserInfo
}
