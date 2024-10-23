'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Label } from '@/components/ui/label'

const signInFormSchema = z.object({
  email: z.string().email({ message: 'Use exemple@enerflux.team' }),
  password: z.string().min(1, { message: 'Use 123456' }),
})

type SignInFormSchema = z.infer<typeof signInFormSchema>

export function SignInForm() {
  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: 'admin@enerflux.team',
      password: '123456',
    },
  })

  // Captura erro caso necessário
  const handleFormError = searchParams.get('error')

  // Envio do formulario de login
  const handleSignIn = async (data: SignInFormSchema) => {
    const { email, password } = data

    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/company-registration',
    })
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col gap-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="email" className="ml-1 text-blue-900">
          E-mail
        </Label>
        <input
          id="email"
          type="email"
          placeholder="digite seu e-mail"
          className="rounded-xl border border-transparent bg-zinc-200 px-3 py-2 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          {...register('email')}
        />

        {errors.email && <p className="text-sm font-medium text-red-500 dark:text-red-400">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="password" className="ml-1 text-blue-900">
          Senha
        </Label>
        <input
          id="password"
          type="password"
          placeholder="digite sua senha"
          className="rounded-xl border border-transparent bg-zinc-200 px-3 py-2 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          {...register('password')}
        />

        {errors.password && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 w-full rounded-xl border-2 border-blue-700 bg-blue-800 py-2 text-white"
        disabled={isSubmitting}
      >
        Entrar
      </button>

      {handleFormError && (
        <div className="mt-4 flex justify-center">
          <span className="font-mono font-semibold text-red-600">Dados inválidos! Tente novamente</span>
        </div>
      )}
    </form>
  )
}
