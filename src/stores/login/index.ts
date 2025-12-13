import { defineStore } from 'pinia'
import { ref } from 'vue'
import { accountLogin, checkLoginStatus } from '@/services/login'
import type { AccountLoginDto, LoginUserInfo } from '@/types'

const useLoginStore = defineStore(
  'login',
  () => {
    const token = ref<string>()
    const loginUser = ref<LoginUserInfo>()

    const accountLoginAction = async (account: AccountLoginDto) => {
      try {
        const res = await accountLogin(account)
        token.value = res.token
        loginUser.value = res.user
      } catch (err) {
        console.log('登录出现错误:', err)
        throw err
      }
    }

    const checkLoginStatusAction = async () => {
      try {
        return await checkLoginStatus()
      } catch (err) {
        console.log('获取登录状态失败:', err)
        throw err
      }
    }

    const logout = () => {
      token.value = undefined
      loginUser.value = undefined
    }

    return {
      token,
      loginUser,
      accountLoginAction,
      checkLoginStatusAction,
      logout,
    }
  },
  {
    persist: {
      pick: ['token', 'loginUser'],
    },
  },
)

export default useLoginStore
