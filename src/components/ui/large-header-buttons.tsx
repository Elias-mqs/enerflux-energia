'use client'

import * as Dropdown from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { MdOutlineSettings } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'

export function LargeHeaderButtons({ restrictedArea }: { restrictedArea: boolean }) {
  // Rolar até o input de busca
  const scrollToSection = () => {
    const section = document.getElementById('user-action')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className="hidden items-center justify-end md:flex">
      <button
        className={twMerge(
          'mr-4 rounded-3xl px-6 py-1 text-blue-300 transition-transform hover:scale-110',
          restrictedArea ? 'hidden' : '',
        )}
      >
        <Link href="/company-registration" prefetch={false}>
          Área Restrita
        </Link>
      </button>

      <button
        onClick={scrollToSection}
        className={twMerge(
          'rounded-full bg-gradient-to-r from-blue-300 to-blue-500 px-4 py-2 font-bold text-white transition-transform hover:scale-105',
          restrictedArea ? 'hidden' : '',
        )}
      >
        Encontrar fornecedores
      </button>

      <Dropdown.Root>
        <Dropdown.Trigger
          className={twMerge(
            'rounded-full bg-gradient-to-l from-blue-500 to-blue-800 p-1 hover:from-blue-600 hover:to-blue-900',
            restrictedArea ? '' : 'hidden',
          )}
        >
          <MdOutlineSettings size={28} color="#93c5fd" />
        </Dropdown.Trigger>
        <Dropdown.Content className="mr-8 mt-2">
          <Dropdown.Item>
            <button
              onClick={() => signOut()}
              className={twMerge(
                'rounded-full bg-gradient-to-l from-blue-400 to-blue-700 px-20 py-1 text-white hover:from-blue-600 hover:to-blue-900',
                restrictedArea ? '' : 'hidden',
              )}
            >
              Sair
            </button>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </div>
  )
}
