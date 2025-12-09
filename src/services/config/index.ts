let BASE_URL = ''

if (import.meta.env.MODE === 'production') {
  BASE_URL = ''
} else {
  BASE_URL = ''
}

console.log(import.meta.env)
export { BASE_URL }

export const TIMEOUT = 2000
