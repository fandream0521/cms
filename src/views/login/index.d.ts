declare type LoginType = 'password' | 'phone'
declare interface LoginOption {
  type: LoginType
  account?: string
  phone?: string
  password?: string
  checkCode?: string
  isRememberPassword?: boolean
}
