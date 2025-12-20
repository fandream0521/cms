import useLoginStore from '@/stores/login'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { dynamicRoutes } from './dynamicRouter'
import type { Menu } from '@/types'
import NotFound from '@/views/not-found/NotFound.vue'
import { storeToRefs } from 'pinia'

const mainRoute: RouteRecordRaw = {
  path: '/main',
  component: () => import('@/views/main/index.vue'),
  children: [
    {
      path: '/:pathMatcher(.*)',
      component: () => import('@/views/not-found/NotFound.vue'),
    },
  ],
}
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  mainRoute,
  {
    path: '/:pathMatcher(.*)',
    component: () => import('@/views/not-found/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export function initMenu(menus: Menu[]) {
  const routes = [...transferMenuToRoutes(menus), ...(mainRoute.children ?? [])]
  mainRoute.children = routes
  router.addRoute(mainRoute)
}

function transferMenuToRoutes(menus: Menu[]): RouteRecordRaw[] {
  return menus.map((menu) => {
    const route = {} as unknown as RouteRecordRaw
    route.name = menu.name
    let path = menu.url
    if (!path.startsWith('/main')) {
      path = '/main' + path
    }
    route.path = path

    if (menu.children && menu.children.length > 0) {
      route.children = transferMenuToRoutes(menu.children)
    } else {
      const comp = dynamicRoutes[path]
      if (comp) {
        route.component = comp
      } else {
        route.component = NotFound
      }
      console.log(menu)
    }
    return route
  })
}

router.beforeEach(async (to) => {
  const path = to.path
  const { token, menuList, menuInit } = storeToRefs(useLoginStore())
  if (!menuInit.value) {
    if (menuList.value) {
      console.log('init router')
      initMenu(menuList.value)
      menuInit.value = true
      router.replace(to)
    }
    return
  }
  if (path !== '/login') {
    if (!token) {
      return {
        path: '/login',
        query: {
          redirect: to.path,
        },
      }
    } else {
      const { checkLoginStatusAction } = useLoginStore()
      const isValidToken = await checkLoginStatusAction()
      if (!isValidToken) {
        return {
          path: '/login',
          query: {
            redirect: to.path,
          },
        }
      }
    }
  }
})

export default router
