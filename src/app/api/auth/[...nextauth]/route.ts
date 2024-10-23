import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/',
  },
  session: {
    maxAge: 2 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'digite seu email' },
        password: { label: 'Password', type: 'password', placeholder: 'digite sua senha' },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        if (!credentials) {
          return null
        }

        if (credentials.email === 'admin@enerflux.team' && credentials.password === '123456') {
          const user = {
            id: crypto.randomUUID(),
            name: 'Administrador',
            email: 'admin@enerflux.team',
          }

          return user
        }

        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
})

export { handler as GET, handler as POST }
