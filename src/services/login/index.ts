import { request } from '..'
import { type LoginUserInfo, type AccountLoginDto, type LoginResult } from '@/types'

export async function accountLogin(data: AccountLoginDto) {
  console.log('发送登录请求，数据:', data)
  return await request.post<LoginResult>('/login', data)
}

export async function checkLoginStatus() {
  return await request.get<LoginUserInfo>('/test')
}
