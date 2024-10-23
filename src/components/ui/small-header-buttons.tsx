import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { twMerge } from 'tailwind-merge'

export function SmallHeaderButtons({ isOpen, restrictedArea }: { isOpen?: boolean; restrictedArea: boolean }) {
  // Rolar até o input de busca
  const scrollToSection = () => {
    const section = document.getElementById('user-action')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div
      className={twMerge(
        'mb-4 flex max-h-full flex-col-reverse items-center justify-center gap-4 transition-all md:hidden',
        isOpen ? 'h-full' : 'm-[-2] h-0 overflow-hidden',
      )}
    >
      <button
        onClick={scrollToSection}
        className={twMerge(
          'rounded-full bg-gradient-to-r from-blue-300 to-blue-500 px-4 py-2 font-bold text-white transition-transform hover:scale-105',
          restrictedArea ? 'hidden' : '',
        )}
      >
        Encontrar fornecedores
      </button>

      <button
        className={twMerge(
          'rounded-3xl px-6 py-1 text-blue-300 transition-transform hover:scale-110',
          restrictedArea ? 'hidden' : '',
        )}
      >
        <Link href="/company-registration" prefetch={false}>
          Área Restrita
        </Link>
      </button>

      <button
        onClick={() => signOut()}
        className={twMerge(
          'mb-4 rounded-full bg-gradient-to-l from-blue-500 to-blue-800 px-20 py-1 text-blue-100',
          restrictedArea ? '' : 'hidden',
        )}
      >
        Sair
      </button>
    </div>
  )
}
