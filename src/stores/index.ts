import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import type { App } from 'vue'
import useLoginStore from './login'
import { initMenu } from '@/router'

const pinia = createPinia()
pinia.use(
  createPersistedState({
    key: (id) => `__persisted__${id}`,
  }),
)

function registerPinia(app: App<Element>) {
  app.use(pinia)

  const loginStore = useLoginStore()
  const { token, menuList } = loginStore
  if (token && menuList && menuList.length > 0) {
    initMenu(menuList)
  }
}
export default registerPinia
