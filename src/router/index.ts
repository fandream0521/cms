import useLoginStore from '@/stores/login'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

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
    path: '/main',
    component: () => import('@/views/main/Main.vue'),
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

router.beforeEach(async (to) => {
  if (to.path !== '/login') {
    const { token } = useLoginStore()
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
