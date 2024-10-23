// Função para buscar a URL base em que o projeto está rodando
export function getBaseUrl() {
  if (typeof window === 'undefined') return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}/api/`
  return `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT ?? 3000}/api/`
}
