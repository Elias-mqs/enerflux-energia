import { Metadata } from 'next'

import { SignInForm } from './sign-in-form'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[350px] flex-col justify-center space-y-6 px-2">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-muted-foreground text-sm">
            Use seu email <code>@clarke.team</code>
          </p>
        </div>
        <div>
          <SignInForm />
        </div>
        <p className="px-8 text-center text-sm leading-relaxed">© 2024 Elias Marques. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}
