import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
}

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[350px] flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Acesso negado!</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Parece que ocorreu um erro enquanto você tentava autenticar.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Somente e-mails <code className="text-accent-foreground">@clarke.team</code> são aceitos.
            </p>
          </div>
          <Button asChild variant="outline" type="button" className="w-full">
            <Link href="/auth/sign-in">
              Tente novamente
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
