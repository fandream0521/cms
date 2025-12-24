type ImportType = typeof import('*.vue')
type ImportFnType = () => Promise<ImportType>
const dynamicRouters = import.meta.glob<boolean, string, ImportType>('@/views/main/**/index.vue')

export const dynamicRoutes = Object.entries(dynamicRouters).reduce(
  (router, [path, fn]) => {
    const name = path.replace('/src/views', '').replace('/index.vue', '').toLocaleLowerCase()
    router[name] = fn
    return router
  },
  {} as Record<string, ImportFnType>,
)
