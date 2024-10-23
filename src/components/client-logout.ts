'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

export default function ClientLogout({ session }: { session: Session }) {
  const router = useRouter()

  useEffect(() => {
    if (session.user?.email !== 'admin@enerflux.team') {
      // Executa o logout no lado do cliente
      signOut().then(() => {
        router.push('/')
      })
    }
  }, [session, router])

  return null // Não renderiza nada
}
