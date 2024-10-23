// Função para buscar a URL base em que o projeto está rodando
export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/` : 'http://localhost:3000/api/'
}
