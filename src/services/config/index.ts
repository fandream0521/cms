let BASE_URL = ''

if (import.meta.env.MODE === 'production') {
  BASE_URL = ''
} else {
  BASE_URL = 'http://127.0.0.1:3000'
}

console.log(import.meta.env)
export { BASE_URL }

export const TIMEOUT = 2000
