// Url base
export function getBaseUrl() {
  if (typeof window === 'undefined') return ''
  if (process.env.VERCEL_URL) return `${process.env.VERCEL_URL}/api/`
  // return `${process.env.NEXT_PUBLIC_BASE_URL}/api/`
}
