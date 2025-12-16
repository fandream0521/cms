import type { UserInfo } from '.'

export interface AccountLoginDto {
  name: string
  password: string
}

export interface LoginResult {
  token: string
  user: UserInfo
}
