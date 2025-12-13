type CacheType = 'local' | 'session'

class Cache {
  storage: Storage
  constructor(type: CacheType) {
    if (type === 'local') {
      this.storage = localStorage
    } else {
      this.storage = sessionStorage
    }
  }

  getItem(key: string) {
    const val = this.storage.getItem(key)
    if (val === null) {
      return null
    }
    return JSON.parse(val)
  }

  setItem(key: string, val: unknown) {
    if (val === undefined || val === null) {
      this.storage.removeItem(key)
      return
    }
    this.storage.setItem(key, JSON.stringify(val))
  }

  clear() {
    this.storage.clear()
  }
}

export const local = new Cache('local')
export const session = new Cache('session')
