import { defineStore } from 'pinia'
import { ref } from 'vue'
import { accountLogin, checkLoginStatus } from '@/services/login'
import type { AccountLoginDto, UserInfo, Menu } from '@/types'
import { getMenuListByRoleId } from '@/services/menu'
import { getUserById } from '@/services/user'
import { initMenu } from '@/router'

const useLoginStore = defineStore(
  'login',
  () => {
    const token = ref<string>()
    const loginUser = ref<UserInfo>()
    const menuList = ref<Menu[]>()
    const menuInit = ref<boolean>(false)

    const accountLoginAction = async (account: AccountLoginDto) => {
      try {
        const res = await accountLogin(account)
        token.value = res.token
        loginUser.value = res.user

        const user = await getUserById(res.user.id)
        console.log('user: ', user)
        const roleId = user.roleId
        const menus = await getMenuListByRoleId(roleId)
        console.log('menus', menus)
        menuList.value = menus
        initMenu(menus)
        menuInit.value = true
      } catch (err) {
        console.log('登录出现错误:', err)
        throw err
      }
    }

    const checkLoginStatusAction = async () => {
      try {
        await checkLoginStatus()
        return true
      } catch (err) {
        console.log('获取登录状态失败:', err)
        token.value = undefined
        loginUser.value = undefined
        return false
      }
    }

    const clearLogin = () => {
      token.value = undefined
      loginUser.value = undefined
    }

    return {
      token,
      loginUser,
      menuList,
      menuInit,
      accountLoginAction,
      checkLoginStatusAction,
      clearLogin,
    }
  },
  {
    persist: {
      pick: ['token', 'loginUser', 'menuList'],
    },
  },
)

export default useLoginStore
