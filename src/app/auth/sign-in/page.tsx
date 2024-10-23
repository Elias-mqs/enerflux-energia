import { Suspense } from 'react'

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { SignInForm } from './sign-in-form'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:flex-row">
      {/* Lado esquerdo - logo com fundo gradiente ocupando o restante da tela */}
      <section className="relative m-6 hidden h-[calc(100vh-48px)] flex-col items-center justify-center rounded-xl bg-gradient-to-r from-blue-600/90 via-blue-700/90 to-blue-900/90 md:flex">
        <Image
          alt="bg-city"
          src="/img/bg-city.png"
          layout="fill"
          className="absolute inset-0 object-cover opacity-20"
        />
        {/* Div para centralizar a mensagem */}
        <div className="flex h-full w-full max-w-5xl items-center justify-center px-16">
          <h1 className="px-8 text-center text-3xl font-bold leading-tight text-white">
            Compare, economize e <span className="text-yellow-400">escolha o fornecedor</span> de energia{' '}
            <span className="text-green-400">ideal</span>!
          </h1>
        </div>
      </section>

      {/* Lado direito - formulário de login */}
      <section className="flex flex-1 flex-col items-center justify-center md:mt-[-40px]">
        <header className="mb-4 flex w-full justify-center rounded-full md:ml-12 md:mr-16">
          <div className="flex justify-center rounded-full bg-blue-500/10 p-4">
            <Link href="/">
              <Image alt="logo sign-in" src="/img/logo.png" width={150} height={150} />
            </Link>
          </div>
        </header>
        <article className="flex w-full max-w-[350px] flex-col justify-center gap-6 space-y-6 rounded-lg bg-white/10 p-8 px-4 backdrop-blur-lg md:ml-12 md:mr-16">
          <div className="space-y-2 text-start">
            <h1 className="text-2xl font-semibold tracking-tight text-blue-900">Login</h1>
            <p className="text-muted-foreground text-sm text-blue-900">
              Use seu email <code>@enerflux.team</code>
            </p>
          </div>

          <div>
            <Suspense>
              <SignInForm />
            </Suspense>
          </div>
        </article>
        <footer>
          <p className="px-8 text-center text-sm leading-relaxed text-blue-900">
            © 2024 Elias Marques. Todos os direitos reservados.
          </p>
        </footer>
      </section>
    </main>
  )
}
