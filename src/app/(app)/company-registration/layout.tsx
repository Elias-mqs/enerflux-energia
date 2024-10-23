import { Header } from '@/components/header'

export default async function CompanyRegistrationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col">{children}</div>
      <footer className="flex h-20 w-full items-center justify-center bg-zinc-100 px-8">
        <h2 className="m-auto text-center text-sm font-bold text-gray-400 sm:text-base">
          © 2024 Elias Marques. Todos os direitos reservados.
        </h2>
      </footer>
    </div>
  )
}
