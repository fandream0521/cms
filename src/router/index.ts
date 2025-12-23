import useLoginStore from '@/stores/login'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { dynamicRoutes } from './dynamicRouter'
import type { Menu } from '@/types'
import NotFound from '@/views/not-found/NotFound.vue'

const mainRoute: RouteRecordRaw = {
  path: '/main',
  component: () => import('@/views/main/index.vue'),
  children: [
    {
      path: ':pathMatcher(.*)',
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
  const firstRoute = findFirstRoute(routes)
  if (firstRoute) {
    mainRoute.redirect = firstRoute
  }
  router.addRoute(mainRoute)
  console.log('total route: ', router.getRoutes())
}

function findFirstRoute(routes: RouteRecordRaw[]) {
  if (!routes || routes.length == 0) {
    return null
  }
  const firstRoute = routes[0]
  if (firstRoute?.children && firstRoute.children.length > 0) {
    return findFirstRoute(firstRoute.children)
  }
  return firstRoute?.path
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
      const firstRoue = findFirstRoute(route.children)
      if (firstRoue) {
        route.redirect = firstRoue
      }
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
  const { token } = useLoginStore()
  const path = to.path
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
