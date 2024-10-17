'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInFormSchema = z.object({
  email: z.string().email({ message: 'Use admin@exemple.team' }),
  password: z.string().min(1, { message: 'Use 123456' }),
})

type SignInFormSchema = z.infer<typeof signInFormSchema>

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: 'admin@clarke.team',
      password: '123456',
    },
  })

  async function handleSignIn(data: SignInFormSchema) {
    const { email, password } = data

    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    })
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" {...register('email')} />

        {errors.email && <p className="text-sm font-medium text-red-500 dark:text-red-400">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" type="password" {...register('password')} />

        {errors.password && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Sign in
      </Button>
    </form>
  )
}
