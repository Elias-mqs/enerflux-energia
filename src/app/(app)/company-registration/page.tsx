import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { getCsrfToken } from 'next-auth/react'

import ClientLogout from '@/components/client-logout'

import { RegistrationForm } from './company-registration-form'

export default async function CompanyRegistration() {
  const session = await getServerSession()
  const token = await getCsrfToken()

  // Acesso a página somente com credenciais de administrador
  if (!session || !token) {
    redirect('/auth/sign-in')
  }

  return (
    <main className="flex-1 bg-zinc-100">
      <div className="h-72 w-full bg-gradient-to-r from-blue-600 to-blue-950"></div>
      <div className="flex flex-1 justify-center">
        <div className="mx-8 mb-5 mt-[-192px] w-full max-w-5xl rounded-2xl bg-white p-4 pb-12 shadow-lg">
          <header className="mb-4 border-b border-zinc-100 pb-4">
            <h1 className="font-bold text-blue-800">Novo Fornecedor</h1>
            <h2 className="text-sm text-blue-800">Cadastre um novo fornecedor</h2>
          </header>

          <RegistrationForm userToken={token} />
        </div>
      </div>
      {/* Verifica e faz logout no lado do cliente */}
      <ClientLogout session={session} />
    </main>
  )
}
